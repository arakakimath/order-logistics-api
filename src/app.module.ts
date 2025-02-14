import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HTTPModule } from './http/http.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:docker@127.0.0.1:27017/order-logistics?authSource=admin'),
    HTTPModule,
  ],
})
export class AppModule {}
