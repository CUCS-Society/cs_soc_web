"use client"

import { useState } from "react"
import { Editor } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type SerializedEditorState } from "lexical"
import { DatePickerInput } from "@/components/DatePicker"
import { Post } from "@/generated/prisma/client"
import { useRouter } from "next/navigation"

interface PostFormData {
  title: string
  category: string
  description: string
  slug: string
  jsonEditorState: string
  createdAt: string
}

interface EditPostFormProps {
  post: Post
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<PostFormData>({
    title: post.title,
    category: post.category,
    description: post.description || "",
    slug: post.slug,
    jsonEditorState: post.jsonEditorState,
    createdAt: post.createdAt
      ? new Date(post.createdAt).toISOString()
      : new Date().toISOString(),
  })

  const [editorState] = useState<SerializedEditorState | undefined>(
    post.jsonEditorState ? JSON.parse(post.jsonEditorState) : undefined
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof PostFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({ ...prev, title: value, slug }))
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      publishedAt: date ? date.toISOString() : "",
    }))
  }

  const handleEditorChange = (serializedState: SerializedEditorState) => {
    setFormData((prev) => ({
      ...prev,
      jsonEditorState: JSON.stringify(serializedState),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/posts/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      if (response.ok) {
        console.log("Post updated successfully!")
        router.push(`/soc_web/posts/${formData.category}/${formData.slug}`)
      } else {
        console.error("Failed to update post")
      }
    } catch (error) {
      console.error("Error updating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value || "other")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notice">Notice</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DatePickerInput
                label="Publish Date"
                value={
                  formData.createdAt ? new Date(formData.createdAt) : undefined
                }
                onChange={handleDateChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="url-friendly-slug"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description of the post"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div className="rounded-lg border">
                <Editor
                  onSerializedChange={handleEditorChange}
                  editorSerializedState={editorState}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.category}
              className="w-full"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
