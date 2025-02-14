import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HTTPModule } from './http/http.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb:docker@mongo:27017/order-logistics?authSource=admin'),
    HTTPModule,
  ],
})
export class AppModule {}
