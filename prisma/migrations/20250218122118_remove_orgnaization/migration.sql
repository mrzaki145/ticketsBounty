/*
  Warnings:

  - You are about to drop the `invitation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `invitation` DROP FOREIGN KEY `invitation_inviterId_fkey`;

-- DropForeignKey
ALTER TABLE `invitation` DROP FOREIGN KEY `invitation_organizationId_fkey`;

-- DropForeignKey
ALTER TABLE `member` DROP FOREIGN KEY `member_organizationId_fkey`;

-- DropForeignKey
ALTER TABLE `member` DROP FOREIGN KEY `member_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_userId_fkey`;

-- DropIndex
DROP INDEX `Ticket_userId_fkey` ON `ticket`;

-- DropTable
DROP TABLE `invitation`;

-- DropTable
DROP TABLE `member`;

-- DropTable
DROP TABLE `organization`;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
