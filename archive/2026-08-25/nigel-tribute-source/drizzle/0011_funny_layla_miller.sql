CREATE TABLE `channel_followers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(256) NOT NULL,
	`notifyOnSignal` int NOT NULL DEFAULT 1,
	`notifyOnReply` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `channel_followers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`messageId` int NOT NULL,
	`userId` int NOT NULL,
	`reactionType` enum('fire','brain','diamond','lightning') NOT NULL DEFAULT 'fire',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pinned_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`messageId` int NOT NULL,
	`pinnedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pinned_messages_id` PRIMARY KEY(`id`)
);
