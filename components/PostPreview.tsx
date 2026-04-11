"use server"
import Link from "next/link"
import { CalendarDays, PencilLine } from "lucide-react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Post } from "@/generated/prisma/client"
import { headers } from "next/headers"
import { auth } from "@/lib/auth/auth"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"

type PostPreviewProps = {
  post: Post
  showEdit: Boolean
}

type PostPreviewListProps = {
  header: string
  posts: Post[]
}

const PostPreview = async ({ post, showEdit }: PostPreviewProps) => {
  const category = post.category

  return (
    <article className="flex w-full border-b border-border p-2">
      <Link
        href={`/soc_web/posts/${post.category ?? "all"}/${post.slug}`}
        className={cn(
          "select-rounded-md flex w-full rounded-md leading-none no-underline transition-colors outline-none hover:bg-foreground/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="mr-4 flex w-24 shrink-0 items-center justify-center rounded-md px-2 py-3 text-xs font-semibold uppercase">
          {category}
        </div>

        <div className="min-w-0 flex-1 p-4">
          <h3 className="my-2 text-2xl font-bold text-foreground">
            {post.title}
          </h3>
          <div className="flex gap-2 text-sm leading-snug text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays size={16} />
              <time dateTime={post.createdAt.toDateString()}>
                {post.updatedAt.toDateString()}
              </time>
            </div>
            <span className="opacity-50">|</span>
          </div>
          {post.description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {post.description}
            </p>
          )}
        </div>
      </Link>

      <Link
        href={`soc_web/editor/${post.id}`}
        className="mr-4 flex w-24 shrink-0 items-center justify-center rounded-md px-2 py-3 text-xs font-semibold uppercase no-underline transition-colors outline-none hover:bg-foreground/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <PencilLine className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      </Link>
    </article>
  )
}

export async function PostPreviewList({ header, posts }: PostPreviewListProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="mx-auto mt-12 w-[90%] max-w-none lg:w-1/2">
      <div className="flex gap-2">
        <h1 className="text-base font-bold">{header}</h1>
        {session && (
          <Button variant="outline" size="icon">
            <Link href="/soc_web/editor">
              <Plus className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <span className="sr-only">Create Post</span>
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 place-items-start justify-between">
        <div className="col-span-1 w-full">
          <div className="grid grid-flow-row">
            {posts.map((post) => (
              <PostPreview
                key={post.id}
                post={post}
                showEdit={session ? true : false}
              />
            ))}
          </div>
          <Link
            href="/soc_web/posts/all"
            className="mt-10 flex items-center py-2 text-sm text-accent-foreground underline-offset-4 hover:text-muted-foreground hover:underline"
          >
            See all posts <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
