import { Editor } from "@/components/Editor"
import CreatePostPage from "@/components/CreatePostForm"

export default async function Page() {
  return (
    <div className="mx-auto w-[90%] max-w-none py-10">
      <CreatePostPage />
    </div>
  )
}
