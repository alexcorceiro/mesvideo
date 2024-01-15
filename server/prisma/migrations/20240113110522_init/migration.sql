-- CreateTable
CREATE TABLE `acteurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `age` VARCHAR(100) NULL,

    UNIQUE INDEX `nom`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video_acteurs` (
    `video_id` INTEGER NOT NULL,
    `acteur_id` INTEGER NOT NULL,

    INDEX `acteur_id`(`acteur_id`),
    PRIMARY KEY (`video_id`, `acteur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `videos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `duree` VARCHAR(100) NULL,
    `dateDePublication` VARCHAR(100) NULL,
    `categorie_id` INTEGER NULL,
    `studio_id` INTEGER NULL,
    `image` VARCHAR(255) NULL,
    `videoUrl` VARCHAR(1024) NULL,

    UNIQUE INDEX `titre`(`titre`),
    INDEX `categorie_id`(`categorie_id`),
    INDEX `studio_id`(`studio_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commentaires` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `video_id` INTEGER NULL,
    `description` VARCHAR(255) NULL,
    `star` VARCHAR(100) NULL,
    `date_de_publication` DATE NULL,

    INDEX `user_id`(`user_id`),
    INDEX `video_id`(`video_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favoris` (
    `user_id` INTEGER NOT NULL,
    `video_id` INTEGER NOT NULL,

    INDEX `video_id`(`video_id`),
    PRIMARY KEY (`user_id`, `video_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historiques_de_visionnage` (
    `user_id` INTEGER NOT NULL,
    `video_id` INTEGER NOT NULL,
    `heure_de_debut` TIMESTAMP(0) NULL,
    `heure_de_fin` TIMESTAMP(0) NULL,

    INDEX `video_id`(`video_id`),
    PRIMARY KEY (`user_id`, `video_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `videos` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statistiques` (
    `date` DATE NOT NULL,
    `visiteurs` INTEGER NULL,
    `videos_visionnees` INTEGER NULL,

    PRIMARY KEY (`date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NULL,
    `titre` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pseudo` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `dateNaissance` VARCHAR(255) NULL,
    `role` ENUM('ADMIN', 'GESTIONNAIRE', 'CLIENT') NULL DEFAULT 'CLIENT',

    UNIQUE INDEX `pseudo`(`pseudo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `video_acteurs` ADD CONSTRAINT `video_acteurs_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `video_acteurs` ADD CONSTRAINT `video_acteurs_ibfk_2` FOREIGN KEY (`acteur_id`) REFERENCES `acteurs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`studio_id`) REFERENCES `studios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `commentaires` ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `commentaires` ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favoris` ADD CONSTRAINT `favoris_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favoris` ADD CONSTRAINT `favoris_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historiques_de_visionnage` ADD CONSTRAINT `historiques_de_visionnage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historiques_de_visionnage` ADD CONSTRAINT `historiques_de_visionnage_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
