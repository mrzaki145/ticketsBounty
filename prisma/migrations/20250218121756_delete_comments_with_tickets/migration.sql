-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_ticketId_fkey`;

-- DropIndex
DROP INDEX `Comment_ticketId_fkey` ON `comment`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
