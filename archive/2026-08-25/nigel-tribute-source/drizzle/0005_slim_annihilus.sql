CREATE TABLE `review_category_scores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roundCode` varchar(16) NOT NULL,
	`category` varchar(128) NOT NULL,
	`score` varchar(32) NOT NULL,
	`delta` varchar(32),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `review_category_scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `review_package_scores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roundCode` varchar(16) NOT NULL,
	`packageName` varchar(256) NOT NULL,
	`category` varchar(256) NOT NULL,
	`score` varchar(32) NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `review_package_scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `review_rounds` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roundCode` varchar(16) NOT NULL,
	`roundName` varchar(256) NOT NULL,
	`roundDate` varchar(32) NOT NULL,
	`methodology` text,
	`panelSize` int,
	`overallScore` varchar(32),
	`classification` varchar(128),
	`verdict` varchar(64),
	`block` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `review_rounds_id` PRIMARY KEY(`id`),
	CONSTRAINT `review_rounds_roundCode_unique` UNIQUE(`roundCode`)
);
--> statement-breakpoint
CREATE TABLE `review_university_scores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roundCode` varchar(16) NOT NULL,
	`university` varchar(256) NOT NULL,
	`region` varchar(64) NOT NULL,
	`overallScore` varchar(32),
	`grade` varchar(64),
	`verdict` varchar(32),
	`categoryScores` json,
	`goldenQuote` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `review_university_scores_id` PRIMARY KEY(`id`)
);
