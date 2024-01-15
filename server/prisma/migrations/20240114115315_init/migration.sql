/*
  Warnings:

  - You are about to drop the column `date_de_publication` on the `commentaires` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `commentaires` table. All the data in the column will be lost.
  - You are about to drop the column `star` on the `commentaires` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `commentaires` table. All the data in the column will be lost.
  - You are about to drop the column `video_id` on the `commentaires` table. All the data in the column will be lost.
  - The primary key for the `favoris` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `favoris` table. All the data in the column will be lost.
  - You are about to drop the column `video_id` on the `favoris` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `playlists` table. All the data in the column will be lost.
  - The primary key for the `statistiques` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `videos_visionnees` on the `statistiques` table. All the data in the column will be lost.
  - You are about to drop the column `titre` on the `studios` table. All the data in the column will be lost.
  - You are about to drop the column `categorie_id` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `studio_id` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the `historiques_de_visionnage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_acteurs` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `nom` on table `acteurs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `acteurs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `age` on table `acteurs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nom` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dateDePublication` to the `Commentaires` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Commentaires` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texte` to the `Commentaires` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Commentaires` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `Commentaires` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Favoris` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `Favoris` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Playlists` table without a default value. This is not possible if the table is not empty.
  - Made the column `titre` on table `playlists` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `playlists` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `videosVisionnees` to the `Statistiques` table without a default value. This is not possible if the table is not empty.
  - Made the column `visiteurs` on table `statistiques` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `studios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pseudo` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateNaissance` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `categorieId` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualite` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sousTitres` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studioId` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Made the column `titre` on table `videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duree` on table `videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateDePublication` on table `videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videoUrl` on table `videos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `commentaires` DROP FOREIGN KEY `commentaires_ibfk_1`;

-- DropForeignKey
ALTER TABLE `commentaires` DROP FOREIGN KEY `commentaires_ibfk_2`;

-- DropForeignKey
ALTER TABLE `favoris` DROP FOREIGN KEY `favoris_ibfk_1`;

-- DropForeignKey
ALTER TABLE `favoris` DROP FOREIGN KEY `favoris_ibfk_2`;

-- DropForeignKey
ALTER TABLE `historiques_de_visionnage` DROP FOREIGN KEY `historiques_de_visionnage_ibfk_1`;

-- DropForeignKey
ALTER TABLE `historiques_de_visionnage` DROP FOREIGN KEY `historiques_de_visionnage_ibfk_2`;

-- DropForeignKey
ALTER TABLE `video_acteurs` DROP FOREIGN KEY `video_acteurs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `video_acteurs` DROP FOREIGN KEY `video_acteurs_ibfk_2`;

-- DropForeignKey
ALTER TABLE `videos` DROP FOREIGN KEY `videos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `videos` DROP FOREIGN KEY `videos_ibfk_2`;

-- AlterTable
ALTER TABLE `acteurs` MODIFY `nom` VARCHAR(255) NOT NULL,
    MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `age` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `categories` MODIFY `nom` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `commentaires` DROP COLUMN `date_de_publication`,
    DROP COLUMN `description`,
    DROP COLUMN `star`,
    DROP COLUMN `user_id`,
    DROP COLUMN `video_id`,
    ADD COLUMN `dateDePublication` DATETIME NOT NULL,
    ADD COLUMN `note` INTEGER NOT NULL,
    ADD COLUMN `texte` VARCHAR(255) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `videoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `favoris` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    DROP COLUMN `video_id`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `videoId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `videoId`);

-- AlterTable
ALTER TABLE `playlists` DROP COLUMN `videos`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `titre` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `statistiques` DROP PRIMARY KEY,
    DROP COLUMN `videos_visionnees`,
    ADD COLUMN `videosVisionnees` INTEGER NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL,
    MODIFY `visiteurs` INTEGER NOT NULL,
    ADD PRIMARY KEY (`date`);

-- AlterTable
ALTER TABLE `studios` DROP COLUMN `titre`,
    ADD COLUMN `nom` VARCHAR(255) NOT NULL DEFAULT 'Nom Temporaire',
    MODIFY `image` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `pseudo` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `dateNaissance` DATETIME NOT NULL,
    MODIFY `role` ENUM('ADMIN', 'GESTIONNAIRE', 'CLIENT') NOT NULL DEFAULT 'CLIENT';

-- AlterTable
ALTER TABLE `videos` DROP COLUMN `categorie_id`,
    DROP COLUMN `studio_id`,
    ADD COLUMN `categorieId` INTEGER NOT NULL,
    ADD COLUMN `qualite` VARCHAR(50) NOT NULL,
    ADD COLUMN `sousTitres` VARCHAR(255) NOT NULL,
    ADD COLUMN `studioId` INTEGER NOT NULL,
    MODIFY `titre` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL,
    MODIFY `duree` VARCHAR(100) NOT NULL,
    MODIFY `dateDePublication` DATETIME NOT NULL,
    MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `videoUrl` VARCHAR(1024) NOT NULL;

-- DropTable
DROP TABLE `historiques_de_visionnage`;

-- DropTable
DROP TABLE `video_acteurs`;

-- CreateTable
CREATE TABLE `VideoActeurs` (
    `videoId` INTEGER NOT NULL,
    `acteurId` INTEGER NOT NULL,

    PRIMARY KEY (`videoId`, `acteurId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoriquesDeVisionnage` (
    `userId` INTEGER NOT NULL,
    `videoId` INTEGER NOT NULL,
    `heureDeDebut` TIMESTAMP(0) NOT NULL,
    `heureDeFin` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`userId`, `videoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_VideoToPlaylist` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_VideoToPlaylist_AB_unique`(`A`, `B`),
    INDEX `_VideoToPlaylist_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TagsToVideos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TagsToVideos_AB_unique`(`A`, `B`),
    INDEX `_TagsToVideos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VideoActeurs` ADD CONSTRAINT `VideoActeurs_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Videos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoActeurs` ADD CONSTRAINT `VideoActeurs_acteurId_fkey` FOREIGN KEY (`acteurId`) REFERENCES `Acteurs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Videos` ADD CONSTRAINT `Videos_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Videos` ADD CONSTRAINT `Videos_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `Studios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaires` ADD CONSTRAINT `Commentaires_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaires` ADD CONSTRAINT `Commentaires_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Videos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favoris` ADD CONSTRAINT `Favoris_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favoris` ADD CONSTRAINT `Favoris_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Videos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriquesDeVisionnage` ADD CONSTRAINT `HistoriquesDeVisionnage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriquesDeVisionnage` ADD CONSTRAINT `HistoriquesDeVisionnage_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Videos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playlists` ADD CONSTRAINT `Playlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_VideoToPlaylist` ADD CONSTRAINT `_VideoToPlaylist_A_fkey` FOREIGN KEY (`A`) REFERENCES `Playlists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_VideoToPlaylist` ADD CONSTRAINT `_VideoToPlaylist_B_fkey` FOREIGN KEY (`B`) REFERENCES `Videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagsToVideos` ADD CONSTRAINT `_TagsToVideos_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagsToVideos` ADD CONSTRAINT `_TagsToVideos_B_fkey` FOREIGN KEY (`B`) REFERENCES `Videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `acteurs` RENAME INDEX `nom` TO `Acteurs_nom_key`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `pseudo` TO `Users_pseudo_key`;

-- RenameIndex
ALTER TABLE `videos` RENAME INDEX `titre` TO `Videos_titre_key`;
