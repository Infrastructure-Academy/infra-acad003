CREATE TABLE `perspective_scores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roundCode` varchar(16) NOT NULL,
	`role` varchar(128) NOT NULL,
	`score` varchar(16) NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `perspective_scores_id` PRIMARY KEY(`id`)
);
