export type CommentType = {
    id: string;
    content: string;
    createdAt: string;
}

export type PostType = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    comments: CommentType[];
}

export type PostForm = {
    title: string;
    content: string;
}

export type CommentForm = {
    content: string;
}