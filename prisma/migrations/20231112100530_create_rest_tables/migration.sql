/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Diskusi` (
    `ID_Diskusi` VARCHAR(191) NOT NULL,
    `Penulis` VARCHAR(191) NOT NULL,
    `Judul` VARCHAR(191) NOT NULL,
    `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_at` DATETIME(3) NOT NULL,
    `Konten` VARCHAR(191) NOT NULL,
    `JumlahKomentar` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Diskusi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentar` (
    `ID_Komentar` VARCHAR(191) NOT NULL,
    `ID_Diskusi` VARCHAR(191) NOT NULL,
    `Penulis` VARCHAR(191) NOT NULL,
    `Created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_at` DATETIME(3) NOT NULL,
    `Konten` VARCHAR(191) NOT NULL,
    `Jumlah_Upvote` INTEGER NOT NULL,
    `Jumlah_Downvote` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Komentar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Soal` (
    `ID_Soal` VARCHAR(191) NOT NULL,
    `ID_Latsol` VARCHAR(191) NOT NULL,
    `pertanyaan` VARCHAR(191) NOT NULL,
    `jawaban_benar` VARCHAR(191) NOT NULL,
    `jawaban_salah1` VARCHAR(191) NOT NULL,
    `jawaban_salah2` VARCHAR(191) NOT NULL,
    `jawaban_salah3` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_Soal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jawaban_Pengguna` (
    `ID_Soal` VARCHAR(191) NOT NULL,
    `ID_Pengguna` INTEGER NOT NULL,
    `jawaban` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_Soal`, `ID_Pengguna`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Latihan_Soal` (
    `ID_Latsol` VARCHAR(191) NOT NULL,
    `ID_Material` INTEGER NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deksripsi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_Latsol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History_Latsol` (
    `ID_Latsol` VARCHAR(191) NOT NULL,
    `ID_Pengguna` INTEGER NOT NULL,
    `modified_at` DATETIME(3) NOT NULL,
    `nilai` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Latsol`, `ID_Pengguna`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Komentar` ADD CONSTRAINT `Komentar_ID_Diskusi_fkey` FOREIGN KEY (`ID_Diskusi`) REFERENCES `Diskusi`(`ID_Diskusi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Soal` ADD CONSTRAINT `Soal_ID_Latsol_fkey` FOREIGN KEY (`ID_Latsol`) REFERENCES `Latihan_Soal`(`ID_Latsol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jawaban_Pengguna` ADD CONSTRAINT `Jawaban_Pengguna_ID_Soal_fkey` FOREIGN KEY (`ID_Soal`) REFERENCES `Soal`(`ID_Soal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History_Latsol` ADD CONSTRAINT `History_Latsol_ID_Latsol_fkey` FOREIGN KEY (`ID_Latsol`) REFERENCES `Latihan_Soal`(`ID_Latsol`) ON DELETE RESTRICT ON UPDATE CASCADE;
