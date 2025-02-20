import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productProviders } from './product.providers';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...productProviders
  ],
})
export class ProductsModule {}
