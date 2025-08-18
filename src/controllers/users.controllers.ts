import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'nguyenthienan@gmail.com' && password === '91') {
    res.json({
      message: 'Login Successfully'
    })
  } else {
    res.status(400).json({
      error: 'Login failed'
    })
  }
}
