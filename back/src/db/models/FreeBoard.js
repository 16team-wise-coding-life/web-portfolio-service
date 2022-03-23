import { FreeBoardModel } from '../schemas/freeboard';

class FreeBoard {
  static async create({ newPost }) {
    const createdNewPost = await FreeBoardModel.create(newPost);
    return createdNewPost;
  }

  static async findById({ post_id }) {
    const post = await FreeBoard.findOne({ _id: post_id });
    return post;
  }

  static async findAll() {
    const posts = await FreeBoard.findAll({});
    return posts;
  }

  static async findAllByUserId({ user_id }) {
    const posts = await FreeBoard.findAllByUserId({ user_id: user_id });
    return posts;
  }

  static async update({ post_id, newValues }) {
    const filter = { _id: project_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const updatedPost = await FreeBoard.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }

  static async delete({ post_id }) {
    await FreeBoard.deleteOne({ _id: post_id });
    return '삭제가 완료되었습니다.';
  }
}

export { FreeBoard };
