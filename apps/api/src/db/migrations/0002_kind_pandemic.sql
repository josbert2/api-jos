CREATE TABLE `components` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` varchar(500),
	`type` varchar(60) NOT NULL DEFAULT 'registry:component',
	`dependencies` json DEFAULT ('[]'),
	`registry_dependencies` json DEFAULT ('[]'),
	`files` json DEFAULT ('[]'),
	`tags` json DEFAULT ('[]'),
	`preview` varchar(1000),
	`is_published` boolean NOT NULL DEFAULT true,
	`order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `components_id` PRIMARY KEY(`id`),
	CONSTRAINT `components_name_unique` UNIQUE(`name`)
);
