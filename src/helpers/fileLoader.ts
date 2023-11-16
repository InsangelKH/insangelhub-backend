import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const getMulterOptions = () => ({
    limits: {
        fileSize: 1024 * 1024 * 3, // 3 MB
    },

    storage: diskStorage({
        destination: (_req: any, _file: any, cb: any) => {
            const storagePath = `${process.cwd()}/public/images/`;

            if (!existsSync(storagePath)) {
                mkdirSync(storagePath, { recursive: true });
            }

            cb(null, storagePath);
        },

        filename: (_req: any, file: any, cb: any) => {
            const newFileName = `${new Date().valueOf()}_${file.originalname}`;
            cb(null, newFileName);
        },
    }),
});

export const renameUploadedFile = (filename: string) => {
    const updatedFilename = changeFilenameSafe(filename);

    return updatedFilename;
};

const changeFilenameSafe = (origFilename: string) => (
    `${new Date().valueOf()}_${origFilename.replace(/\s/g, '_').replace(/[^.a-zA-Z0-9_-]/g, '')}`
);
