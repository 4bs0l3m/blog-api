import { BaseDTO } from '../common/BaseDTO';

export class CategoryDTO extends BaseDTO {
  name: string;
  description: string;
  parentCategoryId: string;
}
