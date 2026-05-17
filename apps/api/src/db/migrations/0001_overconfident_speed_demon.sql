CREATE TABLE `resource_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`slug` varchar(120) NOT NULL,
	`color` varchar(32),
	`order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `resource_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `resource_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(1000) NOT NULL,
	`title` varchar(300) NOT NULL,
	`description` text,
	`thumbnail` varchar(1000),
	`favicon` varchar(1000),
	`tags` json DEFAULT ('[]'),
	`category_id` int,
	`notes` text,
	`is_favorite` boolean NOT NULL DEFAULT false,
	`order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resources_id` PRIMARY KEY(`id`)
);
