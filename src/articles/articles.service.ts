import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '@/articles/entities/article.entity';
import { Model } from 'mongoose';
import { CategoriesService } from '@/categories/categories.service';

@Injectable({ scope: Scope.REQUEST })
export class ArticlesService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const isCateogryExist = await this.categoryService.getCategoryByName(
      createArticleDto.category,
    );
    if (!isCateogryExist) {
      return null;
    }
    const article = new this.articleModel(createArticleDto);
    article.author = this.request.user['_id'];
    return article.save();
  }

  async findBySlug(slug: string) {
    const article = await this.articleModel.findOne({ slug: slug }).exec();
    return article;
  }

  async addComment(article: Article, commentId: string) {
    const commented = await this.articleModel.findByIdAndUpdate(
      article._id,
      { comments: commentId },
      { new: true, useFindAndModify: false },
    );
    if (!commented) {
      return null;
    }
    return commented;
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
