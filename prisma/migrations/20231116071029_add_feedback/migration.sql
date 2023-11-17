-- CreateTable
CREATE TABLE `Feedback` (
    `ID_Komentar` VARCHAR(191) NOT NULL,
    `ID_Pengguna` INTEGER NOT NULL,
    `Is_upvote` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Komentar`, `ID_Pengguna`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_ID_Komentar_fkey` FOREIGN KEY (`ID_Komentar`) REFERENCES `Komentar`(`ID_Komentar`) ON DELETE RESTRICT ON UPDATE CASCADE;
