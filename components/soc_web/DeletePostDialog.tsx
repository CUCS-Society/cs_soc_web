"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"

export const DeletePostDialog = ({ postId }: { postId: string }) => {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/posts/${postId}`,
      {
        method: "DELETE",
      }
    )
    if (response.ok) {
      setOpen(false)
      window.location.reload()
    } else {
      console.error("Failed to delete post")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="mr-4 flex h-full w-24">
          <Trash2 className="h-[1.2rem] w-[1.2rem] scale-100" />
          <span className="sr-only">Delete Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
