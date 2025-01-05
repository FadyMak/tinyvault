"use client"

import { CopyIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function CopySecretButton(props: { secret: string }) {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={async () => {
        await navigator.clipboard.writeText(props.secret)
        toast.info("Secret copied to clipboard.")
      }}
    >
      <CopyIcon className="size-4" />
    </Button>
  )
}
