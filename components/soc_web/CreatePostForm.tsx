"use client"

import { useState } from "react"
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
import { DatePickerInput } from "@/components/soc_web/DatePicker"
import { useRouter } from "next/navigation"
import { PlateEditor, defaultEditorValue } from "../editor/plate-editor"
import { Toaster } from "sonner"
import { SerializedEditorState } from "../editor/plate-types"
import { TPlateEditor } from "platejs/react"
import { Value } from "platejs"

interface PostFormData {
  title: string
  category: string
  description: string
  slug: string
  jsonEditorState: string
  htmlContent: string
  createdAt: string
}

export default function CreatePostPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    category: "",
    description: "",
    slug: "",
    jsonEditorState: JSON.stringify(defaultEditorValue),
    htmlContent: "",
    createdAt: new Date().toISOString(),
  })

  const [editorState, setEditorState] =
    useState<SerializedEditorState>(defaultEditorValue)
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
      createdAt: date ? date.toISOString() : "",
    }))
  }

  const handleEditorChange = async ({
    value,
    editor,
  }: {
    value: Value
    editor: TPlateEditor
  }) => {
    setEditorState(value)

    setFormData((prev) => ({
      ...prev,
      jsonEditorState: JSON.stringify(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      if (response.ok) {
        console.log("Post created successfully!")
        router.push(`/soc_web/news/${formData.category}/${formData.slug}`)
      } else {
        console.error("Failed to create post")
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
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
                    handleInputChange("category", value!)
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
                label="Create Date"
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
                <PlateEditor
                  value={editorState}
                  onChange={handleEditorChange}
                />
                <Toaster />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.category}
              className="w-full"
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
