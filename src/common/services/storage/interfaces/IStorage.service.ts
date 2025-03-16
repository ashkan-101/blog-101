export interface IStorageService {
  upload(file: Express.Multer.File, path: { path: string; prefix?: string }): Promise<{imagePath: string, imageName: string;}>;
  deleteFile(filePath: string, fileName: string): Promise<void>;
  readFile(filePath: string, fileName: string): Promise<any>
}