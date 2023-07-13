import { Result } from "../Result";


class InvalidFileSize extends Error {}

class UnableToUploadFile extends Error{}

type UploadedFile = {file: File, downloadUrl: string}

interface FileUploadService {
    uploadFile(file: File): string, // can throw
}

declare function validateFile(file: File): void

const handleUploadFile = (file: File, fileService: FileUploadService, confirmationEmail: string): UploadedFile => {
    validateFile(file); //can throw 

    try {
       const downloadUrl = fileService.uploadFile(file) //can throw

       return {file, downloadUrl};
    }
    catch(e){
        throw new UnableToUploadFile()
    }
}

