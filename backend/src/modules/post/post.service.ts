import fs from "fs/promises";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary.helper.js";
import { IPostRepository } from "./post.interface.js";
import { createPostDTO, updatePostDTO } from "./post.schema.js";
import ApiError from "../../utils/ApiError.js";

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

  async gerPostsByUserId(userId: string) {
    const posts = await this.repo.gerPostsByUserId(userId);

    return posts;
  }

  async updatePostById(body: updatePostDTO, userId: string, postId: string) {
    const { title, description } = body;

    const post = await this.repo.getPostByUserIdAndPostId(postId, userId);

    if(!post){
      throw new ApiError(404, "Post not found")
    }

    const updatedPost = await this.repo.updatePost(
      postId,
      title,
      description,
      userId,
    );

    return updatedPost;
  }

  async deletePost(postId : string, userId : string){
    const post = await this.repo.getPostByUserIdAndPostId(postId, userId)
    if(!post){
      throw new ApiError(404, "Post not found")
    }

    await this.repo.deletePost(postId);

    if(post.imageUrl){
      await deleteFromCloudinary(post)
    }

    return true

  }

  async getAllPosts(){
   const posts = await this.repo.getAllPosts();
   return posts;

  }
}
