"use server"

import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { base64url, EncryptJWT } from "jose"

const encryptionKey = base64url.decode(process.env.ENCRYPTION_KEY)

export async function createSecret(formData: FormData) {
  const expiresInValue = formData.get("expires_in_value")
  const expiresInUnit = formData.get("expires_in_unit")
  const secret = formData.get("secret")
  const emails = formData.get("emails")

  if (
    typeof expiresInValue !== "string" ||
    typeof expiresInUnit !== "string" ||
    typeof secret !== "string" ||
    typeof emails !== "string"
  ) {
    return {
      error: "The fields must be strings.",
    }
  }

  if (!expiresInValue || !expiresInUnit) {
    return {
      error: "The expires in value and unit are required.",
    }
  }

  if (!secret) {
    return {
      error: "A value for the secret is required.",
    }
  }

  if (secret.length > 500) {
    return {
      error: "The secret must be shorter than 500 characters.",
    }
  }

  if (!emails) {
    return {
      error: "At least one email must be specified.",
    }
  }

  const user = await currentUser()
  const emailsSet = new Set(emails.split(",").map((e) => e.trim()))

  // add the current authenticated user's email addresses
  user?.emailAddresses.forEach((e) => emailsSet.add(e.emailAddress))

  // simple email validation: just check if it includes the "@" symbol since regex will be too error prone
  for (const email of emailsSet) {
    if (!email.includes("@")) {
      return {
        error: `Invalid email: ${email}.`,
      }
    }
  }

  const jwt = await new EncryptJWT({ secret, emails: Array.from(emailsSet) })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresInValue + expiresInUnit)
    .encrypt(encryptionKey)

  redirect(
    new URL(
      `/share?${new URLSearchParams({
        secret: jwt,
      })}`,
      process.env.NEXT_PUBLIC_APP_URL
    ).toString()
  )
}
