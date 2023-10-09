import { ChatGateway } from './gateways/chat.gateway';
import { ChatController } from './controllers/chat.controller';
import { PageController } from './controllers/page.controller';
import { StatusController } from './controllers/status.controller';
import { UserController } from './controllers/user.controller';
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
import { AuthController } from './controllers/auth.controller';
import { Env } from './env';
import { ProfileController } from './controllers/profile.controller';
import { Status, StatusSchema, StatusService } from './services/status.service';
import { Page, PageSchema, PageService } from './services/page.service';

@Module({
  imports: [
    JwtModule.register({
      secret: Env.secretKey,
      signOptions: { expiresIn: '12h' },
    }),
    MongooseModule.forRoot(Env.mongoDb),
    MongooseModule.forFeature([
      { name: Status.name, schema: StatusSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Page.name, schema: PageSchema },
    ]),
  ],
  controllers: [
    ChatController,
    PageController,
    StatusController,
    UserController,
    AuthController,
    MediaController,
    CategoryController,
    PostController,
    AppController,
    ProfileController,
  ],
  providers: [
    ChatGateway,
    PageService,
    StatusService,
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
