-- DropForeignKey
ALTER TABLE `History_Latsol` DROP FOREIGN KEY `History_Latsol_ID_Latsol_fkey`;

-- DropForeignKey
ALTER TABLE `Komentar` DROP FOREIGN KEY `Komentar_ID_Diskusi_fkey`;

-- DropForeignKey
ALTER TABLE `Soal` DROP FOREIGN KEY `Soal_ID_Latsol_fkey`;

-- AddForeignKey
ALTER TABLE `Komentar` ADD CONSTRAINT `Komentar_ID_Diskusi_fkey` FOREIGN KEY (`ID_Diskusi`) REFERENCES `Diskusi`(`ID_Diskusi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Soal` ADD CONSTRAINT `Soal_ID_Latsol_fkey` FOREIGN KEY (`ID_Latsol`) REFERENCES `Latihan_Soal`(`ID_Latsol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History_Latsol` ADD CONSTRAINT `History_Latsol_ID_Latsol_fkey` FOREIGN KEY (`ID_Latsol`) REFERENCES `Latihan_Soal`(`ID_Latsol`) ON DELETE CASCADE ON UPDATE CASCADE;
