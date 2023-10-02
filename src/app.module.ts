import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

import { BookmarkModule } from './bookmark/bookmark.module';


@Module({
  imports: [AuthModule, UserModule, PrismaModule , ConfigModule.forRoot({isGlobal:true}), BookmarkModule],

})
export class AppModule {}
