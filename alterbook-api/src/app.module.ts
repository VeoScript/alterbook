import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { AccountModule } from './account/account.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PostModule,
    AccountModule,
    ReactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
