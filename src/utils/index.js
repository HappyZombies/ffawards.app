const crypto = require("crypto");
const { ApplicationError } = require("../errors");
const { ENCRYPTION_KEY, ENCRYPTION_ALGORITHM } = process.env;
const ivLength = 16;

const encrypt = (text) => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, Buffer.from(ENCRYPTION_KEY, "hex"), iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (encryptedText) => {
    if (!encryptedText) {
        throw new ApplicationError("No encrypted text provided.");
    }
    const [iv, encrypted] = encryptedText.split(":");
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, Buffer.from(ENCRYPTION_KEY, "hex"), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

const THIRTY_DAYS_MAX_AGE =  30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

const dynamoConfig = {
    region: process.env.AWS_REGION || "us-east-1",
    ...(process.env.DYNAMODB_ENDPOINT && { endpoint: process.env.DYNAMODB_ENDPOINT })
};

module.exports = {
    encrypt,
    decrypt,
    THIRTY_DAYS_MAX_AGE,
    dynamoConfig
};
