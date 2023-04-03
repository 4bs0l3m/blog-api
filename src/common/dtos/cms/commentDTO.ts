import { BaseDTO } from '../common/BaseDTO';

export class CommentDTO extends BaseDTO {
  postId: string;

  parentId: string;

  userId: string;

  text: string;
}
