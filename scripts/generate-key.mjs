import * as jose from "jose"

const secret = await jose.generateSecret("A256GCM")
console.log(jose.base64url.encode(secret.export()))
