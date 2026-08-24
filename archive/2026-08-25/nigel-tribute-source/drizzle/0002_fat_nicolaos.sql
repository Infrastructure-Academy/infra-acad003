CREATE TABLE `tecton_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`term` varchar(256) NOT NULL,
	`partOfSpeech` json NOT NULL,
	`morphology` text NOT NULL,
	`roots` json NOT NULL,
	`etymology` text NOT NULL,
	`hice` varchar(1) NOT NULL,
	`conjugation` text NOT NULL,
	`whyThisWord` text NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`block` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tecton_entries_id` PRIMARY KEY(`id`),
	CONSTRAINT `tecton_entries_term_unique` UNIQUE(`term`)
);
--> statement-breakpoint
CREATE TABLE `tecton_meta` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(64) NOT NULL,
	`value` json NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tecton_meta_id` PRIMARY KEY(`id`),
	CONSTRAINT `tecton_meta_key_unique` UNIQUE(`key`)
);
