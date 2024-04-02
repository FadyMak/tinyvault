import * as jose from 'jose'

const secret = await jose.generateSecret('A128CBC-HS256')
console.log(jose.base64url.encode(secret.export()))