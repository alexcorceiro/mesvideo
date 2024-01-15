/*
  Warnings:

  - You are about to alter the column `dateDePublication` on the `commentaires` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateNaissance` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateDePublication` on the `videos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `commentaires` MODIFY `dateDePublication` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dateNaissance` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `videos` MODIFY `dateDePublication` DATETIME NOT NULL;
