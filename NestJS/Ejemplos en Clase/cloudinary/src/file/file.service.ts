import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { parse } from 'node:path';

cloudinary.config({
  cloud_name: "Cloudinary_Cloud_Name" ,
  api_key: "api_key_here",
  api_secret: "api_secret_here",
});

@Injectable()
export class FileService {
    cloudinaryUploader(file: Express.Multer.File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'usuarios',
                    public_id: parse(file.originalname).name,
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) {
                        reject(
                            new Error('No se pudo subir la foto a Cloudinary')
                        );
                    } else if (!result?.secure_url) {
                        reject(
                            new Error('Cloudinary no devolvio la URL de la foto')
                        );
                    } else {
                        resolve(result.secure_url);
                    }
                },
            );
            stream.on('error', (error: Error) => {
                reject(
                    new Error('No se pudo enviar la foto a Cloudinary')
                );
            });
            stream.end(file.buffer);
        });
    }
}
