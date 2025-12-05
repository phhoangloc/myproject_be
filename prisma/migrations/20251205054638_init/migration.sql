/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagBlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_hostId_fkey`;

-- DropForeignKey
ALTER TABLE `TagBlog` DROP FOREIGN KEY `TagBlog_blogId_fkey`;

-- DropForeignKey
ALTER TABLE `TagBlog` DROP FOREIGN KEY `TagBlog_tagId_fkey`;

-- DropTable
DROP TABLE `Blog`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `TagBlog`;
