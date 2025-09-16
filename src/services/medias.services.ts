import { config } from 'dotenv'
import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { isProduction } from '~/constants/config'
import { UPLOAD_DIR } from '~/constants/directory'
import { getNameFromFullName, handleUploadSingleImage } from '~/utils/file'
config()
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
    return isProduction
      ? `${process.env.HOST}/medias/${newName}.jpg`
      : `http://localhost:${process.env.PORT}/uploads/${newName}.jpg`
  }
}

const mediasService = new MediasService()
export default mediasService
