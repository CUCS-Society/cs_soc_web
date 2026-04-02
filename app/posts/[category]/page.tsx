import { PostPreviewList } from "@/components/PostPreview";
import { posts } from "@/lib/seed";
interface PostProps {
  params: Promise<{
    category: string;
  }>;
}


export default async function Page( { params } : PostProps ) {
    const { category } = await params;
    const filteredPosts = posts.filter((post)=>(category === 'all' || post.category == category));
    return(
        <PostPreviewList header={category} posts={filteredPosts} />
    );
}