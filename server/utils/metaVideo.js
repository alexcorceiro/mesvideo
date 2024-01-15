const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

exports.getVideoMetadonner = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) {
            return reject(new Error("Aucun buffer de fichier spécifié."));
        }

        // Création d'un fichier temporaire pour l'analyse
        const tempFilePath = `temp-${Date.now()}.mp4`;
        fs.writeFileSync(tempFilePath, fileBuffer);

        ffmpeg.ffprobe(tempFilePath, (err, metadata) => {
            // Assurez-vous de supprimer le fichier temporaire après utilisation
            fs.unlink(tempFilePath, unlinkErr => {
                if (unlinkErr) {
                    console.error("Erreur lors de la suppression du fichier temporaire:", unlinkErr);
                }
            });

            if (err) {
                reject(err);
            } else {
                const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
                if (!videoStream) {
                    return reject(new Error("Aucun flux vidéo trouvé dans le fichier."));
                }

                const duration = metadata.format.duration; // Durée en secondes
                const quality = `${videoStream.width}x${videoStream.height}`; // Résolution
                resolve({ duration, quality });
            }
        });
    });
};

exports.generateThumbnail = (videoBuffer, timestamp, outputPath) => {
    return new Promise((resolve, reject) => {
        // Vérifiez si videoBuffer est bien un Buffer
        if (!Buffer.isBuffer(videoBuffer)) {
            return reject(new Error("Le contenu vidéo doit être un Buffer."));
        }

        // Vérifier si le répertoire de sortie existe, sinon le créer
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        // Créer un nom de fichier temporaire pour la vidéo
        const tempVideoFilename = `temp_video_${Date.now()}.mp4`;
        const tempVideoPath = path.join(outputPath, tempVideoFilename);

        // Écrire le buffer vidéo dans un fichier temporaire
        fs.writeFile(tempVideoPath, videoBuffer, err => {
            if (err) {
                return reject(err);
            }

            // Créer un nom de fichier pour la miniature
            const thumbnailFilename = `thumbnail_${Date.now()}.png`;
            const thumbnailPath = path.join(outputPath, thumbnailFilename);

            // Utiliser ffmpeg pour générer la miniature
            ffmpeg(tempVideoPath)
                .screenshots({
                    timestamps: [timestamp],
                    filename: thumbnailFilename,
                    folder: outputPath,
                    size: '320x240'
                })
                .on('end', () => {
                    // Lire le fichier de la miniature dans un Buffer
                    fs.readFile(thumbnailPath, (readErr, thumbnailBuffer) => {
                        if (readErr) {
                            return reject(readErr);
                        }

                        // Supprimer le fichier vidéo temporaire et la miniature
                        fs.unlink(tempVideoPath, () => {}); // Ignorer l'erreur de suppression
                        fs.unlink(thumbnailPath, () => {}); // Ignorer l'erreur de suppression

                        resolve(thumbnailBuffer);
                    });
                })
                .on('error', ffmpegErr => {
                    fs.unlink(tempVideoPath, () => {}); // Ignorer l'erreur de suppression
                    reject(ffmpegErr);
                });
        });
    });
};