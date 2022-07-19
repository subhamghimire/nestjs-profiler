import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from '@/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@/categories/dto/update-category.dto';
import { Category } from '@/categories/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto, userId: string) {
    const category = new this.categoryModel(createCategoryDto);
    category.author = userId;
    return category.save();
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async getCategoryByName(name: string) {
    const category = await this.categoryModel.findOne({ name: name }).exec();
    if (!category) {
      return null;
    }
    return category;
  }
}
