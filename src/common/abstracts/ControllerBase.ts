import { BaseDTO } from '../dtos/common/BaseDTO';
import { ServiceBase } from './ServiceBase';

export class ControllerBase<DTO extends BaseDTO, Document extends BaseDTO> {
  constructor(private service: ServiceBase<DTO, Document>) {}
  create() {
    this.service;
  }
}
