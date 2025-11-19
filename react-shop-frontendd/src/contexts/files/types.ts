export type LocalFile = {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
  is_used: boolean;
}

export const ACCEPTED_IMAGE_TYPES = ['.jpeg', '.jpg', '.png', '.webp', '.svg']

export type CreateFilesPayload = {
  files: File[]
  path: string
  key: string
}

export type CreateFilesResponse = {
  files: LocalFile[]
  message?: string
}

export type CreateFiles = (payload: CreateFilesPayload) => Promise<CreateFilesResponse>

export type DeleteFileResponse = {
  message?: string
}

export type DeleteFile = (id: number) => Promise<DeleteFileResponse>

export type FilesContextProps = {
  deleteFile: DeleteFile
  createFiles: CreateFiles
}
