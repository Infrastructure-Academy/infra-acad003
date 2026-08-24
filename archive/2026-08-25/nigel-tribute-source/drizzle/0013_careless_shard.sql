CREATE TABLE `dcsn_card_versions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nodeNumber` varchar(6) NOT NULL,
	`name` varchar(256) NOT NULL,
	`cardVersion` varchar(32) NOT NULL,
	`cdnUrl` text,
	`blockNumber` int,
	`createdBy` varchar(64) NOT NULL,
	`cardData` json,
	`changeNote` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dcsn_card_versions_id` PRIMARY KEY(`id`)
);
