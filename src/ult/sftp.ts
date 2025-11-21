require('dotenv').config()

export const sftpConfig = {
    host: process.env.SFTP_HOST || "",
    username: process.env.SFTP_USER || "",
    password: process.env.SFTP_PASSWORD || "",
    port: 22
};