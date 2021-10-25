import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/category/:name')
  async findByCategory(
    @Param('name') categoryName: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const result: Product[] = await this.productService.findByCategory(
      categoryName,
    );

    // eslint-disable-next-line prettier/prettier
    return res.status(HttpStatus.OK).json({ "list": result });
  }

  @Get('/subCategory/:name')
  async findBySubCategory(
    @Param('name') subCategoryName: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const result: Product[] = await this.productService.findBySubCategory(
      subCategoryName,
    );
    // eslint-disable-next-line prettier/prettier
    return res.status(HttpStatus.OK).json({ "list" : result });
  }
}
