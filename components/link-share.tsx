"use client"

import { useSearchParams } from "next/navigation"
import { CopyIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LinkShare() {
  const searchParams = useSearchParams()
  const url = new URL(`/view?${searchParams}`, process.env.NEXT_PUBLIC_APP_URL)

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="link" className="sr-only">
        URL
      </Label>
      <div className="flex space-x-2">
        <Input type="url" id="link" readOnly value={url.toString()} />
        <Button
          size="icon"
          variant="outline"
          onClick={async () => {
            await navigator.clipboard.writeText(url.toString())
            toast.info("Link copied to clipboard.")
          }}
        >
          <CopyIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}
