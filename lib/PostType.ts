export type Author = {
    name: string;
}

export type Post = {
    _id: number;
    slug: string;
    title: string;
    publishedDate: string;
    category: string;
    tags?: string[];
    description: string;
    author?: Author;
};
