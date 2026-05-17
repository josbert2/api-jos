import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { DRIZZLE, DrizzleDB } from '../db/drizzle.module';
import { users } from '../db/schema';

// username -> slug ASCII kebab-case (lo que va en /studio/<username>)
function slugifyUsername(raw: string) {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function publicUser(user: typeof users.$inferSelect) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    bio: user.bio,
    role: user.role,
  };
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { token, user: publicUser(user) };
  }

  async register(input: {
    email: string;
    username: string;
    password: string;
    name?: string;
  }) {
    const email = input.email.trim().toLowerCase();
    const username = slugifyUsername(input.username);
    if (username.length < 3) {
      throw new ConflictException('El usuario debe tener al menos 3 caracteres válidos.');
    }

    const existing = await this.db
      .select({ id: users.id, email: users.email, username: users.username })
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)));
    if (existing.some((u) => u.email === email)) {
      throw new ConflictException('Ese email ya está registrado.');
    }
    if (existing.some((u) => u.username === username)) {
      throw new ConflictException('Ese usuario ya está en uso.');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const [result] = await this.db.insert(users).values({
      email,
      username,
      passwordHash,
      name: input.name?.trim() || null,
    });

    const user = await this.findById(result.insertId);
    if (!user) throw new ConflictException('No se pudo crear la cuenta.');
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { token, user: publicUser(user) };
  }

  async findById(id: number) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user ?? null;
  }
}
