export interface IPostRepository {
  createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ): Promise<any>;

  gerPostsByUserId(userId: string): Promise<any>;
  getPostByUserIdAndPostId(postId: string, userId: string): Promise<any>;

  updatePost(
    postId: string,
    title?: string ,
    description?: string ,
    userId?: string,
  ): Promise<any>;

  deletePost(postId : string) : Promise<any>
}


