import { Model } from 'mongoose';
import { BaseDTO } from '../dtos/common/BaseDTO';
import { QueryDTO } from '../dtos/common/QueryDTO';

export class ServiceBase<DTO extends BaseDTO, Document extends BaseDTO> {
  constructor(private model: Model<Document>) {}
  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
  findOne(filter: DTO | any) {
    return this.model.findOne(filter).exec();
  }
  getCount() {
    return this.model.count().exec();
  }
  async findAll(query: QueryDTO) {
    const filter = {};

    return {
      data: await this.model
        .find(filter)
        .limit(Number(query.limit))
        .skip(Number(query.skip))
        .sort(query.orderBy)
        .exec(),
      count: await this.model.count().exec(),
    };
  }

  find(filter: DTO | any) {
    return this.model.find(filter).exec();
  }

  async findById(id: string) {
    const result = await this.model.findOne({ id: id }).exec();
    return result.toJSON();
  }
  async create(model: DTO | any, userId: string) {
    model.id = this.newGuid();
    model.metadata = {
      createdBy: userId,
      createdTime: new Date(),
      active: 1,
    };
    const createdModel = await new this.model(model).save();
    return createdModel.id;
  }
  async updateById(id, model: DTO | any, userId: string) {
    const _model = await this.model
      .findOne({
        id: id,
      })
      .exec();
    if (_model) {
      if (_model.metadata) {
        _model.metadata.modifiedBy = userId;
        _model.metadata.modifiedTime = new Date();
      } else {
        _model.metadata = {};
        _model.metadata.modifiedBy = userId;
        _model.metadata.modifiedTime = new Date();
      }
      model.metadata = _model.metadata;
      model.id = _model.id;
      const updatedModel = await this.model.findOneAndUpdate(
        { id: model.id },
        model,
      );
      await updatedModel.save();
      return await this.model
        .findOne({
          id: id,
        })
        .exec();
    } else {
      return null;
    }
  }
  async deleteById(id, userId) {
    const _model = (
      await this.model
        .findOne({
          id: id,
        })
        .exec()
    ).toObject<DTO>();
    if (_model) {
      if (_model.metadata) {
        _model.metadata.modifiedBy = userId;
        _model.metadata.modifiedTime = new Date();
      } else {
        _model.metadata = {};
        _model.metadata.modifiedBy = userId;
        _model.metadata.modifiedTime = new Date();
      }
      _model.metadata.active = 2;
      const deletedModel = await this.model.findOneAndUpdate(
        { id: id },
        _model,
      );
      return (await deletedModel.save()).id;
    } else {
      return null;
    }
  }
}
