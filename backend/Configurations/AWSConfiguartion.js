const {S3Client} = require('@aws-sdk/client-s3')

const s3clinet = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
    },
})

module.exports = s3clinet;