import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: string,
  ) {
    const generaedId = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return { id: generaedId };
  }
}
