export abstract class StorageService {
  abstract upload(file: Express.Multer.File, path: { path: string; prefix?: string });
  abstract deleteFile(filePath: string, fileName: string): Promise<void>;
  // abstract getFileUrl(path: string): string;
}