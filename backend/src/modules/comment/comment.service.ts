import ApiError from "../../utils/ApiError.js";
import { ICommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentService {
  constructor(private repo: ICommentRepository) {}

  async createComment(body: createCommentDTO, postId: string, userId: string) {
    const { comment } = body;
    const post = await this.repo.getPost(postId);

    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    const response = await this.repo.createComment(comment, userId, postId);
    return response;
  }

  async getAllCommentsByPost(postId: string) {
    const post = await this.repo.getPost(postId);

    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    const comments = await this.repo.getAllCommentsByPost(postId);
    return comments;
  }

  async deleteComment(userId: string, commentId: string, postId: string) {
    const comment = await this.repo.getComment(commentId);
    const post = await this.repo.getPost(postId);
    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (userId !== comment.userId && userId !== post.userId) {
      throw new ApiError(403, "You don't have permission to do this");
    }

    await this.repo.deleteComment(commentId);
  }
}
