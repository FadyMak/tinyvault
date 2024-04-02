import { LockClosedIcon } from "@radix-ui/react-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function Unauthorized() {
  return (
    <Alert variant="destructive">
      <LockClosedIcon className="size-4" />
      <AlertTitle>Unauthorized</AlertTitle>
      <AlertDescription>
        You are not authorized to view this secret.
      </AlertDescription>
    </Alert>
  )
}
