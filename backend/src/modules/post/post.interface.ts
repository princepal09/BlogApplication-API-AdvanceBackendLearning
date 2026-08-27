export interface IPostRepository {
  createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ): Promise<any>;

  gerPostsByUserId(
   userId : string
  ): Promise<any>;

}
