/*
  Warnings:

  - Added the required column `Keywords` to the `Diskusi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Diskusi` ADD COLUMN `Keywords` VARCHAR(191) NOT NULL;
