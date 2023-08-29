import { BaseDTO } from '../common/BaseDTO';

export class PostDTO extends BaseDTO {
  authorId: string;
  categoryId: string;
  type:string;
  title: string;
  content: string;
}
