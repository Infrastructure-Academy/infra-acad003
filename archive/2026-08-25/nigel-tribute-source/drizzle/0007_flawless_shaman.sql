CREATE TABLE `anchor_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(128) NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`site` varchar(256) NOT NULL,
	`description` text,
	`verifiedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `anchor_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `anchor_links_key_unique` UNIQUE(`key`)
);
