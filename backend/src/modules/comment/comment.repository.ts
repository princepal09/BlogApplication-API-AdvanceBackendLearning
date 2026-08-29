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

  async deleteComment(commentId: string): Promise<any> {
      await prisma.comment.delete({
        where : {
            id : commentId,
        }
      })

      return true;
  }

  async updateComment(commentId: string, comment:string, userId : string): Promise<any> {
      const updatedComment  = await prisma.comment.update({
        where : {
            id : commentId,
            userId
        },
        data :{
            comment
        }
      })

      return updatedComment;
  }

  async getComment(commentId: string): Promise<any> {
    const comment = await prisma.comment.findFirst({
      where : {
        id: commentId
      }
    })

    return comment;
  }
}
