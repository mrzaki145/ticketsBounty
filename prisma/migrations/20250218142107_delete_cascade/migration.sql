-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `commentvote` DROP FOREIGN KEY `CommentVote_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `commentvote` DROP FOREIGN KEY `CommentVote_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ticketvote` DROP FOREIGN KEY `TicketVote_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `ticketvote` DROP FOREIGN KEY `TicketVote_userId_fkey`;

-- DropIndex
DROP INDEX `Comment_ticketId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `CommentVote_userId_fkey` ON `commentvote`;

-- DropIndex
DROP INDEX `Ticket_userId_fkey` ON `ticket`;

-- DropIndex
DROP INDEX `TicketVote_userId_fkey` ON `ticketvote`;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketVote` ADD CONSTRAINT `TicketVote_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketVote` ADD CONSTRAINT `TicketVote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentVote` ADD CONSTRAINT `CommentVote_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentVote` ADD CONSTRAINT `CommentVote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
