import { auth, currentUser } from "@clerk/nextjs/server"
import { base64url, errors, jwtDecrypt } from "jose"
import Markdown from "react-markdown"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LinkShare } from "@/components/link-share"

import { Expired } from "./expired"
import { Unauthorized } from "./unauthorized"

const encryptionKey = base64url.decode(process.env.ENCRYPTION_KEY)

export default async function View({
  searchParams,
}: {
  searchParams: { secret: string }
}) {
  // ensure the user is authenticated, otherwise redirect them to the sign-in flow
  const user = await currentUser()
  const { redirectToSignIn } = auth()

  if (!user) {
    return redirectToSignIn()
  }

  let authorizedEmails = []
  let decryptedSecret = null
  try {
    const { payload } = await jwtDecrypt(searchParams.secret, encryptionKey, {})
    authorizedEmails = payload.emails as string[]
    decryptedSecret = payload.secret as string
  } catch (e: any) {
    if (e.code === errors.JWTExpired.code) {
      return <Expired />
    }

    return <Unauthorized />
  }

  const authorizedEmail = authorizedEmails.find((authzedEmail) =>
    user.emailAddresses.find(
      (authedEmail) => authedEmail.emailAddress === authzedEmail
    )
  )

  if (!authorizedEmail) {
    return <Unauthorized />
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Secret</CardTitle>
          <CardDescription>
            You are authenticated as{" "}
            <span className="font-semibold">{authorizedEmail}</span> and have
            been granted access to view this secret.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-neutral max-w-full">
            <Markdown>{decryptedSecret}</Markdown>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shareable link</CardTitle>
          <CardDescription>
            Use the following link to securely share the secret with authorized
            users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinkShare />
        </CardContent>
      </Card>
    </div>
  )
}
