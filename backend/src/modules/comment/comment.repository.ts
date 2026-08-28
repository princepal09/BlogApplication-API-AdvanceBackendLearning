import { prisma } from "../../lib/prisma.js";
import { ICommentRepository } from "./comment.interface.js";

export class CommentRepository implements ICommentRepository {
  async createComment(
    comment: string,
    userId: string,
    postId: string,
  ): Promise<any> {
    const result = await prisma.comment.create({
      data: {
        comment,
        postId,
        userId,
      },
    });

    return result;
  }

  async getAllCommentsByPost(postId: string): Promise<any> {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    });

    return comments;
  }

  async getPost(postId: string): Promise<any> {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    return post;
  }
}
