-- CreateTable
CREATE TABLE `CommentVote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commentId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `voteType` ENUM('UPVOTE', 'DOWNVOTE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommentVote` ADD CONSTRAINT `CommentVote_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentVote` ADD CONSTRAINT `CommentVote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
