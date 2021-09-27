import { Injectable } from '@nestjs/common';
import { Category } from './entity/Category.entity';
import { CategoryRepository } from './entity/category.repository';
import { SubCategory } from './entity/subCategory.entity';
import { SubCategoryRepository } from './entity/subCategory.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly subCategoryRepository: SubCategoryRepository,
  ) {}

  async initialCategory() {
    const category: Category = new Category();
    category.name = '의류';
    const cloth = await this.categoryRepository.save(category);
    category.name = '전자제품';
    this.categoryRepository.save(category);
    category.name = '음식';
    this.categoryRepository.save(category);
    category.name = '도서';
    const book = await this.categoryRepository.save(category);
    category.name = '생활용품';
    this.categoryRepository.save(category);
    category.name = '완구/취미';
    this.categoryRepository.save(category);

    const subCategory: SubCategory = new SubCategory();
    subCategory.name = '상의';
    const c1 = await this.subCategoryRepository.save(subCategory);
    subCategory.name = '하의';
    const c2 = await this.subCategoryRepository.save(subCategory);
    subCategory.name = '액세서리';
    const c3 = await this.subCategoryRepository.save(subCategory);
    subCategory.name = '신발';
    const c4 = await this.subCategoryRepository.save(subCategory);
    subCategory.name = '성별';
    const c5 = await this.subCategoryRepository.save(subCategory);

    const subCloth = await this.categoryRepository.findOne(cloth.id);
    subCloth.categories.push(c1);
    subCloth.categories.push(c2);
    subCloth.categories.push(c3);
    subCloth.categories.push(c4);
    subCloth.categories.push(c5);

    this.categoryRepository.save(subCloth);

    subCategory.name = '전공도서';
    const b1 = await this.subCategoryRepository.save(subCategory);
    subCategory.name = '교양도서';
    const b2 = await this.subCategoryRepository.save(subCategory);

    const subBook = await this.categoryRepository.findOne(book.id);
    subBook.categories.push(b1);
    subBook.categories.push(b2);
  }
}
