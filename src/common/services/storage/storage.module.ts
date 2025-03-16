import { Module } from "@nestjs/common"
import { StorageService } from "./storage.service";


@Module({
  providers: [
    StorageService,
    // {
    //   provide: 'IStorageService',
    //   useClass: 
    // }
  ]
})
export class StorageModule{}