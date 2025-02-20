import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';
import { PRODUCT_REPOSITORY } from 'src/config';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
  ){}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.create({ ...createProductDto });
  }

  async getAll(paginationDto: PaginationDto) {
    
    const { page: currentPage, limit: perPage } = paginationDto;

    const { count: totalPages, rows: queryProducts } =
      await this.productRepository.findAndCountAll({
        limit: perPage,
        offset: (currentPage - 1) * perPage,
      });

      return {
        data: queryProducts,
        meta: {
          total: totalPages,
          page: currentPage,
          lastPage: Math.ceil(totalPages / perPage),
        },
      };
  }

  async getById(id: string) {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new RpcException({
        message: `Product with id: #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { id: ___, ...restData } = updateProductDto;

    const productQuery = await this.productRepository.findByPk(id);

    if(!productQuery){
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Product with id: #${id} not found`,
      });
    }

    await productQuery.update({ ...restData });

    return productQuery
  }


  async deleteById(id: string) {
    const productQuery = await this.productRepository.findByPk(id);

    if(!productQuery){
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Product with id: #${id} not found`,
      });
    }

    await productQuery.destroy();
    
    return productQuery;
  }

  async validateProducts(ids: string[]) {

    ids = Array.from(new Set(ids));

    const products = await this.productRepository.findAll({ where: { id: ids } });

    if (products.length !== ids.length) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Some product were not found`,
      });
    }

    return products
  }
}
