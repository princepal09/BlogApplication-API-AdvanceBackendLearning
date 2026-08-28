export interface ICommentRepository {
  createComment(comment: string, userId: string, postId: string): Promise<any>;
  getAllCommentsByPost(postId: string): Promise<any>;
  getPost(postId: string): Promise<any>;
}
