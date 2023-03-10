import { MediaController } from './controllers/media.controller';
import { Media, MediaSchema, MediaService } from './services/media.service';
import { CategoryController } from './controllers/category.controller';
import { PostController } from './controllers/post.controller';
import {
  Profile,
  ProfileSchema,
  ProfileService,
} from './services/profile.service';
import {
  Category,
  CategorySchema,
  CategoryService,
} from './services/category.service';
import { User, UserSchema, UserService } from './services/user.service';
import { Post, PostSchema, PostService } from './services/post.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthHelper } from './helpers/auth.helper';
import { ResponseHelper } from './helpers/response.helper';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '12h' },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Media.name, schema: MediaSchema },
    ]),
  ],
  controllers: [
    MediaController,
    CategoryController,
    PostController,
    AppController,
  ],
  providers: [
    MediaService,
    CategoryService,
    AuthHelper,
    ResponseHelper,
    ProfileService,
    UserService,
    PostService,
    AppService,
  ],
})
export class AppModule {}
