import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async initialCategory(@Res() res: Response) {
    await this.categoryService.initialCategory();
    return res.status(HttpStatus.OK).json({ result: 'success' });
  }
}
