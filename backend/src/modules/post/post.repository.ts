import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";

export class PostRepository implements IPostRepository {
  async createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl: string,
  ) {
    let post;
    if (imageUrl) {
      post = await prisma.post.create({
        data: {
          title,
          description,
          imageUrl,
          userId,
        },
      });
    } else {
      post = await prisma.post.create({
        data: {
          title,
          description,
          userId,
        },
      });
    }

    return post;
  }

  async gerPostsByUserId(userId: string) {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
  }

  async getPostByUserIdAndPostId(postId: string, userId: string) {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId,
      },
    });

    return post;
  }

  async updatePost(postId: string, title?: string , description?: string, userId?: string): Promise<any> {
    const updatedPost = await prisma.post.update({
      where : {
        id : postId
      },
      data : {
        title,
        description
      }
    })

    return updatedPost;
  }

  async deletePost(postId: string): Promise<any> {
    await prisma.post.delete({
      where  : {
        id:postId
      }
    })
  }


}
