/* eslint-disable prettier/prettier */
import { Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ConvertToken } from 'src/CustomDecorator/tokenConvert';
import { ProductService } from './product.service';
import { TokenContext } from 'src/dto/tokenContext';
import { CreateProduct } from './dto/createProduct.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/multer';

@Controller('product')
export class ProductController {
    constructor( private readonly productService: ProductService ){}

    @Post('/')
    @UseInterceptors(FilesInterceptor('images', 5, multerOption))
    async sale(@ConvertToken() user: TokenContext, createProduct: CreateProduct, @Res() res:Response){
        this.productService.create(user, createProduct)
    }
}
