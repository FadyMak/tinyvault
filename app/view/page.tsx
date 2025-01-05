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

import { CopySecretButton } from "./copy-secret-button"
import { Expired } from "./expired"
import { Unauthorized } from "./unauthorized"

const encryptionKey = base64url.decode(process.env.ENCRYPTION_KEY)

export default async function View(props: {
  searchParams: Promise<{ secret: string }>
}) {
  const searchParams = await props.searchParams
  // ensure the user is authenticated, otherwise redirect them to the sign-in flow
  const user = await currentUser()
  const { redirectToSignIn } = await auth()

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
        <CardHeader className="py-4">
          <CardTitle className="flex items-center justify-between">
            <span>Secret</span>
            <CopySecretButton secret={decryptedSecret} />
          </CardTitle>
        </CardHeader>
        <CardContent className="rounded-b-xl bg-gray-50 p-6">
          <Markdown className="prose prose-neutral max-w-[75ch] overflow-x-auto font-mono">
            {decryptedSecret}
          </Markdown>
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
