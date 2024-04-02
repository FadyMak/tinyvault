import { ClockIcon } from "@radix-ui/react-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function Expired() {
  return (
    <Alert variant="destructive">
      <ClockIcon className="size-4" />
      <AlertTitle>Secret Expired</AlertTitle>
      <AlertDescription>
        The secret has expired and can no longer be viewed.
      </AlertDescription>
    </Alert>
  )
}
