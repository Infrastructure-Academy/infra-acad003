CREATE TABLE `icard_register` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cardId` varchar(64) NOT NULL,
	`blockNumber` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`category` enum('GOVERNANCE','TEACHING','BREACH','HANDSHAKE','COMPLETION','PLANNING') NOT NULL,
	`cdnUrl` text NOT NULL,
	`thumbnailUrl` text,
	`pinnedTo` varchar(128),
	`createdBy` varchar(128) NOT NULL,
	`syncedToAcad` int NOT NULL DEFAULT 0,
	`acadCardId` varchar(64),
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `icard_register_id` PRIMARY KEY(`id`),
	CONSTRAINT `icard_register_cardId_unique` UNIQUE(`cardId`)
);
