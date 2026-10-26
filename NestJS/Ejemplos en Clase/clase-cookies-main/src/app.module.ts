import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenticationModule,
    MongooseModule.forRoot(process.env.MONGO_URL!),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
