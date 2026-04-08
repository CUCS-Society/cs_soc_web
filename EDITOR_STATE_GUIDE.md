# Editor State Storage Guide

This guide explains how to store and retrieve Lexical editor state in your database.

## Database Schema

Your `Post` model already includes the necessary field:

```prisma
model Post {
  // ... other fields
  jsonEditorState String    // Stores the serialized Lexical editor state
  htmlContent     String    // Generated HTML from editor state
}
```

## How It Works

### 1. Storing Editor State

The `Editor` component provides an `onSerializedChange` callback that receives the serialized editor state as a `SerializedEditorState` object.

```tsx
const [editorState, setEditorState] = useState<SerializedEditorState | null>(null)

const handleEditorChange = (serializedState: SerializedEditorState) => {
  setEditorState(serializedState)
  // Store as JSON string in your form data
  setFormData(prev => ({
    ...prev,
    jsonEditorState: JSON.stringify(serializedState)
  }))
}

<Editor
  onSerializedChange={handleEditorChange}
  editorSerializedState={editorState}
/>
```

### 2. Saving to Database

When creating or updating a post, send the JSON string to your API:

```tsx
const response = await fetch("/api/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title,
    category,
    jsonEditorState: JSON.stringify(editorState), // Store as string
  }),
})
```

### 3. Loading Editor State

When editing an existing post, parse the JSON string back to `SerializedEditorState`:

```tsx
useEffect(() => {
  const loadPost = async () => {
    const response = await fetch(`/api/posts/${postId}`)
    const post = await response.json()

    if (post.jsonEditorState) {
      const parsedState = JSON.parse(post.jsonEditorState) as SerializedEditorState
      setEditorState(parsedState)
    }
  }
  loadPost()
}, [postId])
```

## API Endpoints

### Create Post
```
POST /api/posts
```
Body: `{ title, category, description, slug, jsonEditorState }`

### Get Post
```
GET /api/posts/[id]
```

### Update Post
```
PUT /api/posts/[id]
```
Body: `{ title, category, description, slug, jsonEditorState }`

## HTML Generation

The API automatically converts the editor state to HTML using `convertEditorStateToHtml()`. The HTML is stored in the `htmlContent` field and used for displaying posts.

## Components

- `CreatePostForm.tsx` - Form for creating new posts with the editor
- `EditPostForm.tsx` - Form for editing existing posts with state restoration
- `Editor.tsx` - The Lexical editor component

## Usage Example

```tsx
import { Editor } from "@/components/Editor"
import { useState } from "react"
import { type SerializedEditorState } from "lexical"

function MyPostEditor() {
  const [editorState, setEditorState] = useState<SerializedEditorState | null>(null)

  return (
    <Editor
      onSerializedChange={(state) => {
        setEditorState(state)
        // Save JSON.stringify(state) to database
      }}
      editorSerializedState={editorState} // Load from database
    />
  )
}
```

## Important Notes

1. Always store the `jsonEditorState` as a JSON string in the database
2. Parse it back to `SerializedEditorState` when loading into the editor
3. The `htmlContent` field is auto-generated for display purposes
4. Make sure your database field is large enough to store complex editor states