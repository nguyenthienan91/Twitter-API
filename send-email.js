const { SendEmailCommand, SESClient } = require('@aws-sdk/client-ses')
const { config } = require('dotenv')

config()
// Create SES service object.
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
  }
})

const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body,
  subject,
  replyToAddresses = []
}) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: fromAddress,
    ReplyToAddresses: replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses]
  })
}

const sendVerifyEmail = async (toAddress, subject, body) => {
  const sendEmailCommand = createSendEmailCommand({
    fromAddress: process.env.SES_FROM_ADDRESS,
    toAddresses: toAddress,
    body,
    subject
  })

  try {
    const result = await sesClient.send(sendEmailCommand)
    console.log('Email sent successfully:', result)
    console.log('MessageId:', result.MessageId)
    return result
  } catch (e) {
    console.error('Failed to send email:', e)
    console.error('Error details:', e.message)
    return e
  }
}

sendVerifyEmail(
  'nthienan0901@gmail.com',
  'Xác thực tài khoản Twitter Clone',
  `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body style="font-family: Arial, sans-serif;">
      <h2>Xác thực email của bạn</h2>
      <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
      <p>Vui lòng click vào link bên dưới để xác thực email:</p>
      <a href="http://localhost:4000/verify-email?token=xxx" style="background-color: #1DA1F2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Xác thực email</a>
      <p>Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email.</p>
    </body>
    </html>
  `
).then(() => {
  console.log('Email sending completed')
})
