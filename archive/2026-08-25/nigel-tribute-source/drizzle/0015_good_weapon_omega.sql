CREATE TABLE `translation_suggestions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(256) NOT NULL,
	`langCode` varchar(8) NOT NULL,
	`translationKey` varchar(256) NOT NULL,
	`originalValue` text,
	`suggestedValue` text NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`reviewNote` text,
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `translation_suggestions_id` PRIMARY KEY(`id`)
);
