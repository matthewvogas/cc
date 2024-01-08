const aws = require("aws-sdk");

interface SendEmailParameters {
  email: string
  body: string
  subject: string
  source: string
}

const ses = new aws.SES({ region: "us-east-1" })

export const sendEmail = ({
  email,
  body,
  subject,
  source,
}: SendEmailParameters) =>
  ses
    .sendEmail({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Data: body,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: source,
    })
    .promise()