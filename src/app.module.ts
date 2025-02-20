import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { databaseProviders } from './providers';


@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
