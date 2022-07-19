import { Module } from '@nestjs/common';
import { CommentsService } from '@/comments/comments.service';
import { CommentsController } from '@/comments/comments.controller';
import { Comment, CommentScheme } from '@/comments/entities/comment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from '@/articles/articles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentScheme,
      },
    ]),
    ArticlesModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
