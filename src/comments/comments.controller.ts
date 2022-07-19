import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from '@/comments/comments.service';
import { CreateCommentDto } from '@/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '@/comments/dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }

  @Post(':id')
  addComment(
    @Param('id') articleId: string,
    @Body() CreateCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const userId = req.user['_id'];
    return this.commentsService.addComment(articleId, CreateCommentDto, userId);
  }
}
