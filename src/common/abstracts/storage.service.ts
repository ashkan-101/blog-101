export abstract class StorageService {
  abstract upload(file: Express.Multer.File, path: { path: string; prefix?: string });
  abstract deleteFile(path: string): Promise<void>;
  // abstract getFileUrl(path: string): string;
}