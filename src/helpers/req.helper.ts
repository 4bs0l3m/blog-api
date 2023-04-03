import { Injectable } from '@nestjs/common';

@Injectable()
export default class ReqHelper {
  parseFilter(query: any) {
    if (query) {
      if (query.fields) {
      }
    }
  }
}
