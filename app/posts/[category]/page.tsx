import { BreadcrumbPlugin } from "@/components/BreadcrumbPlugin";
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
            <div className="mx-auto w-[90%] lg:w-1/2 max-w-none py-10">
                <BreadcrumbPlugin
                  items={[
                      { label: "Home", href: "/" },
                      { label: "Documents", href: "/documents/constitution"},
                      { label: "Constitution", href: "/documents/constitution" },
                  ]}
                  />
              <PostPreviewList header={category} posts={filteredPosts} />
            </div>
        
    );
}