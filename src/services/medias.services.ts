import { config } from 'dotenv'
import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { isProduction } from '~/constants/config'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/directory'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
import { getNameFromFullName, handleUploadImage, handleUploadVideo } from '~/utils/file'
config()
class MediasService {
  async handleUploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (files) => {
        const newName = getNameFromFullName(files.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        await sharp(files.filepath)
          .jpeg({ quality: 70 })
          .resize(500, 500, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .toFile(newPath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}.jpg`
            : `http://localhost:${process.env.PORT}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async handleUploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const { newFilename } = files[0]
    const result: Media[] = files.map((file) => {
      return {
        url: isProduction
          ? `${process.env.HOST}/static/video/${file.newFilename}`
          : `http://localhost:${process.env.PORT}/static/video/${file.newFilename}`,
        type: MediaType.Video
      }
    })
    return result
  }
}

const mediasService = new MediasService()
export default mediasService
