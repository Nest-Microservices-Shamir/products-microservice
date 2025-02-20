import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'product.create' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'product.get_all' })
  getAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.getAll(paginationDto);
  }

  @MessagePattern({ cmd: 'product.get_by_id' })
  getById(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.getById(id);
  }

  @MessagePattern({ cmd: 'product.update' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ cmd: 'product.delete_by_id' })
  deleteById(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteById(id);
  }

  @MessagePattern({ cmd: 'product.validate_ids' })
  validateProducts(@Payload() ids: string[]){
    return this.productsService.validateProducts(ids);
  }
}
