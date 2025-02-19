-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `comment`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `downvotes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `upvotes` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
