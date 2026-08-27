import fs from "fs/promises";
import { uploadToCloudinary } from "../../utils/cloudinary.helper.js";
import { IPostRepository } from "./post.interface.js";
import { createPostDTO } from "./post.schema.js";

export class PostService {
  constructor(private repo: IPostRepository) {}

  async createPost(
    body: createPostDTO,
    userId: string,
    localFilePath?: string,
  ) {
    const { title, description } = body;

    let post;

    if (localFilePath) {
      const imageUrl = await uploadToCloudinary(localFilePath);

      post = await this.repo.createPost(title, description, userId, imageUrl);
    } else {
      post = await this.repo.createPost(title, description, userId);
    }

    return post;
  }
}
