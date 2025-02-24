import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsUUID()
    @IsNotEmpty()
    id: string;

}
