import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/directory'
import { getNameFromFullName, handleUploadSingleImage } from '~/utils/file'

class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newName = getNameFromFullName(file.newFilename)
    const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)
    await sharp(file.filepath)
      .jpeg({ quality: 70 })
      .resize(500, 500, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(newPath)
    return `http://localhost:4000/uploads/${newName}.jpg`
  }
}

const mediasService = new MediasService()
export default mediasService
