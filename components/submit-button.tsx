"use client"

import { LockClosedIcon } from "@radix-ui/react-icons"
import { useFormStatus } from "react-dom"

import { Spinner } from "./spinner"
import { Button } from "./ui/button"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button aria-disabled={pending} disabled={pending}>
      {pending ? (
        <Spinner className="mr-2 size-4" />
      ) : (
        <LockClosedIcon className="mr-2 size-4" />
      )}
      Generate Link
    </Button>
  )
}
