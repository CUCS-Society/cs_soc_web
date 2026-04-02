import Link from "next/link";
import { format, parseISO } from "date-fns";
import { CalendarDays, Timer } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/PostType";

type PostPreviewProps = {
  post: Post;
};

type PostPreviewListProps = {
  header: string;
  posts: Post[];
};

const PostPreview = ({ post }: PostPreviewProps) => {
  const category = post.category;

  return (
    <article className="w-full border-b border-border p-2">
      <Link
        href={`/posts/${post.category ?? "all"}/${post.slug}`}
        className={cn(
          "select-rounded-md flex w-full rounded-md leading-none no-underline outline-none transition-colors hover:bg-foreground/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="mr-4 flex w-24 shrink-0 items-center justify-center rounded-md px-2 py-3 text-xs font-semibold uppercase">
          {category}
        </div>

        <div className="min-w-0 flex-1 p-4">
          <h3 className="my-2 text-2xl font-bold text-foreground">{post.title}</h3>
          <div className="flex gap-2 text-sm leading-snug text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays size={16} />
              <time dateTime={post.publishedDate}>{format(parseISO(post.publishedDate), "LLLL d, yyyy")}</time>
            </div>
            <span className="opacity-50">|</span>
          </div>
          {post?.tags && (
            <ul className="my-4 flex list-none flex-wrap gap-2 p-0">
              {post.tags.map((tag: string) => (
                <li key={tag}>
                  <Badge
                    variant="outline"
                    className="inline-block rounded-full border border-muted-foreground/50 bg-muted-foreground/10 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          {post.description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{post.description}</p>
          )}
        </div>
      </Link>
    </article>
  );
};

export function PostPreviewList({ header, posts } : PostPreviewListProps){
  return (
      <div className="mx-auto mt-12 w-[90%] lg:w-1/2 max-w-none">
        <h2 className="text-3xl font-bold text-foreground"> { header}</h2>
        <div className="grid grid-cols-1 place-items-start justify-between">
          <div className="col-span-1 w-full">
            <div className="grid grid-flow-row">
              {posts.map((post) => (
                <PostPreview key={post._id} post={post} />
              ))}
            </div>
            <Link
              href="/posts/all"
              className="mt-10 flex items-center py-2 text-sm text-accent-foreground underline-offset-4 hover:text-muted-foreground hover:underline"
            >
              See all posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
  )
};
