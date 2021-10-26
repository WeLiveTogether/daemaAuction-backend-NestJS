import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/category/:name')
  @ApiOperation({
    summary: '카테고리로 분류',
    description: '카테고리 별로 분류',
  })
  @ApiOkResponse({ description: '카테고리 별로 분류', type: Array })
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
  @ApiOperation({
    summary: '부 카테고리로 분류',
    description: '부 카테고리 별로 분류',
  })
  @ApiOkResponse({ description: '부 카테고리 별로 분류', type: Array })
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
