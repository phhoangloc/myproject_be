-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archive` VARCHAR(191) NOT NULL DEFAULT 'blog',
    `hostId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `keyword` TEXT NULL,
    `content` TEXT NULL,
    `infor` TEXT NULL,
    `video` TEXT NULL,
    `cover` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Blog_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archive` VARCHAR(191) NOT NULL DEFAULT 'tag',
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagBlog` (
    `tagId` INTEGER NOT NULL,
    `blogId` INTEGER NOT NULL,

    UNIQUE INDEX `TagBlog_tagId_blogId_key`(`tagId`, `blogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagBlog` ADD CONSTRAINT `TagBlog_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagBlog` ADD CONSTRAINT `TagBlog_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
