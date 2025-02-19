/*
  Warnings:

  - You are about to drop the column `downvotes` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commentId,userId]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_userId_fkey`;

-- DropIndex
DROP INDEX `Comment_ticketId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Ticket_userId_fkey` ON `ticket`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `downvotes`,
    DROP COLUMN `upvotes`;

-- AlterTable
ALTER TABLE `ticket` MODIFY `deadline` VARCHAR(191) NULL,
    MODIFY `bounty` INTEGER NULL;

-- CreateTable
CREATE TABLE `TicketVote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `voteType` ENUM('UPVOTE', 'DOWNVOTE') NOT NULL,

    UNIQUE INDEX `TicketVote_ticketId_userId_key`(`ticketId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CommentVote_commentId_userId_key` ON `CommentVote`(`commentId`, `userId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketVote` ADD CONSTRAINT `TicketVote_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketVote` ADD CONSTRAINT `TicketVote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
