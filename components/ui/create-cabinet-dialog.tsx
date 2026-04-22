"use client"

import * as React from "react"

import { createCabinet } from "@/app/[lang]/soc_web/about/cabinets/actions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateCabinetDialog({
  lang,
  trigger,
}: {
  lang: string
  trigger: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [pending, startTransition] = React.useTransition()
  const [error, setError] = React.useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set("lang", lang)

    startTransition(async () => {
      try {
        await createCabinet(formData)
        form.reset()
        setOpen(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create cabinet")
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (nextOpen) setError(null)
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Cabinet</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="cabinet-year">Year</Label>
              <Input
                id="cabinet-year"
                name="year"
                type="number"
                required
                min={1900}
                max={2100}
                placeholder="2026"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cabinet-editionNumber">Edition #</Label>
              <Input
                id="cabinet-editionNumber"
                name="editionNumber"
                type="number"
                required
                min={0}
                max={1000}
                placeholder="48"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="cabinet-zhName">Chinese name</Label>
              <Input id="cabinet-zhName" name="zhName" placeholder="計星圖" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cabinet-enName">English name</Label>
              <Input id="cabinet-enName" name="enName" placeholder="Example Cabinet" />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cabinet-htmlhref">HTML href (optional)</Label>
            <Input
              id="cabinet-htmlhref"
              name="htmlhref"
              placeholder="/doc/48th_2026/index.html"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cabinet-iconSrc">Icon src (optional)</Label>
            <Input
              id="cabinet-iconSrc"
              name="iconSrc"
              placeholder="/doc/48th_2026/logo_48.png"
            />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
