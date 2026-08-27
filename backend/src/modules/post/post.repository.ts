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

  
}
