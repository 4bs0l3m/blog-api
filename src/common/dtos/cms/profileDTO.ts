import { BaseDTO } from '../common/BaseDTO';

export class ProfileDTO extends BaseDTO {
  userId: string;

  fullname: string;

  profilPicture: string;

  birhdate: string;

  bio: string;
}
