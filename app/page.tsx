"use client"

import { SignedOut, SignInButton, useUser } from "@clerk/nextjs"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MarkdownLogo } from "@/components/markdown-logo"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"

import { createSecret } from "./actions"

export default function Home() {
  const { user } = useUser()

  return (
    <form
      className="grid gap-6"
      action={async (formData: FormData) => {
        const { error } = await createSecret(formData)

        if (error) {
          toast.error(error)
        }
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Secret</CardTitle>
          <CardDescription>
            {"Enter the secret you'd like to encrypt and share."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Textarea
                className="font-mono"
                name="secret"
                rows={10}
                placeholder="Enter a secret..."
              />
              <div className="pointer-events-none flex select-none items-center justify-end">
                <MarkdownLogo className="mr-1 size-5" />
                <span className="text-xs font-medium text-muted-foreground">
                  Supported
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Who can view it?</CardTitle>
          <CardDescription>
            Enter a comma-seperated list of e-mails that are authorized to view
            this secret.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Textarea
                name="emails"
                rows={4}
                placeholder="jane@example.com, john@example.com"
                defaultValue={user?.emailAddresses
                  .map((e) => e.emailAddress)
                  .join(", ")}
              />
            </div>
          </div>
        </CardContent>
        <SignedOut>
          <CardFooter className="text-sm text-muted-foreground">
            <InfoCircledIcon className="mr-2 size-4 shrink-0" />
            <span>
              <SignInButton mode="modal">
                <Button
                  type="button"
                  variant="link"
                  className="h-auto px-0 py-0"
                >
                  Sign-in
                </Button>
              </SignInButton>{" "}
              to be able to view the secret once it has been created.
            </span>
          </CardFooter>
        </SignedOut>
      </Card>

      <Card className="p-6">
        <div className="block items-end justify-between space-y-4 sm:flex">
          <div className="grid w-full gap-2">
            <Label>Expires in</Label>
            <div className="flex space-x-2">
              <Input
                name="expires_in_value"
                defaultValue="2"
                placeholder="2"
                type="number"
                className="w-full sm:w-24"
              />
              <Select name="expires_in_unit" defaultValue="days">
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="seconds">Seconds</SelectItem>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SubmitButton className="w-full sm:w-auto" />
        </div>
      </Card>
    </form>
  )
}
