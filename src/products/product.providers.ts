import { PRODUCT_REPOSITORY } from "src/config";
import { Product } from "./entities/product.entity";


export const productProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
