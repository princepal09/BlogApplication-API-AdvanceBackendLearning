export interface ICommentRepository {
  createComment(comment: string, userId: string, postId: string): Promise<any>;
  getAllCommentsByPost(postId: string): Promise<any>;
  getPost(postId: string): Promise<any>;
  deleteComment(commentId: string, userId  : string): Promise<any>;
  updateComment(commentId: string, comment:string, userId : string): Promise<any>;
}
