const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const TOKEN_KEY = 'api-jos-token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

type FetchOpts = Omit<RequestInit, 'body'> & { body?: unknown };

export async function api<T = unknown>(path: string, opts: FetchOpts = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...opts,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const text = await res.text();
    // El backend (NestJS) responde { message, error, statusCode }; sacamos el message.
    let message = text;
    try {
      const parsed = JSON.parse(text);
      if (parsed?.message) {
        message = Array.isArray(parsed.message) ? parsed.message.join(', ') : parsed.message;
      }
    } catch {
      /* el body no era JSON, dejamos el texto crudo */
    }
    throw new Error(message || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const apiGet = <T = unknown>(path: string) => api<T>(path);
export const apiPost = <T = unknown>(path: string, body: unknown) =>
  api<T>(path, { method: 'POST', body });
export const apiPatch = <T = unknown>(path: string, body: unknown) =>
  api<T>(path, { method: 'PATCH', body });
export const apiDelete = <T = unknown>(path: string) =>
  api<T>(path, { method: 'DELETE' });
