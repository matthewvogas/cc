import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3'

export default class S3Service {
  static s3Client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION!,
  })

  static async uploadPostObject(file: Blob, name: string): Promise<string> {
    const ext = file.type.split('/')[1]
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `posts/${name}.${ext}`,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
      })

      const result = await this.s3Client.send(command)
      if (result.$metadata.httpStatusCode === 200) {
        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/posts/${name}.${ext}`
      }
    } catch (e) {
      console.log(e)
    }
    return ''
  }

  static async uploadCreatorImage(file: Blob, name: string) {
    const ext = file.type.split('/')[1]
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        ContentType: file.type,
        Key: `creators/${name}.${ext}`,
        Body: Buffer.from(await file.arrayBuffer()),
      })

      const result = await this.s3Client.send(command)
      if (result.$metadata.httpStatusCode === 200) {
        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/creators/${name}.${ext}`
      }
    } catch (e) {
      console.log(e)
    }
    return ''
  }
}
