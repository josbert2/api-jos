ALTER TABLE `components` ADD `user_id` int;--> statement-breakpoint
ALTER TABLE `users` ADD `username` varchar(80) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` varchar(500);--> statement-breakpoint
ALTER TABLE `users` ADD `bio` varchar(500);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);