-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archive` VARCHAR(191) NOT NULL DEFAULT 'user',
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `position` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
