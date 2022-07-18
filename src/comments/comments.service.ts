import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticlesService } from 'src/articles/articles.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly articleService: ArticlesService,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  async addComment(
    articleSlug: string,
    createCommentDto: CreateCommentDto,
    userId: string,
  ) {
    const article = await this.articleService.findBySlug(articleSlug);

    if (!article) {
      return null;
    }
    const createComment = await new this.commentModel(createCommentDto);
    createComment.author = userId;
    await createComment.save();

    return this.articleService.addComment(article, createComment._id);
  }
}
