import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LinkShare } from "@/components/link-share"

export default async function Share(props: {
  searchParams: Promise<{ secret: string }>
}) {
  const searchParams = await props.searchParams

  return (
    <div className="grid gap-6">
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
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link href={`/view?${new URLSearchParams(searchParams)}`}>
              View secret <ArrowRightIcon className="ml-1 size-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
