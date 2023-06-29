import { Result, failure, success } from "../Result";

type UploadError = InvalidFileSize | UnableTosendConfirmationEmail ;

interface InvalidFileSize extends Error {};
interface UnableTosendConfirmationEmail extends Error{}

type UploadedFile = {file: File, downloadUrl: string}

declare function validateFile(file: File): Result<UploadError, File>

interface FileUploadService {
    uploadFile(file: File):  Result<UploadError, string>, 
}


const handleUploadFile = (file: File, fileService: FileUploadService): Result<UploadError, UploadedFile> => 
    validateFile(file)
        .andThen(fileService.uploadFile)
        .map(downloadUrl => ({file, downloadUrl}))

