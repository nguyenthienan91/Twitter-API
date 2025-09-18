import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'
import { handleUploadSingleImage } from '~/utils/file'
// console.log(__dirname)
// console.log(path.resolve('uploads'))

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.handleUploadSingleImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_IMAGE_SUCCESS,
    result: url
  })
}
