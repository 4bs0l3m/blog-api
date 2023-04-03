export class QueryDTO {
  fields: { fieldName: string; value: string }[];
  limit: string;
  skip: string;
  orderBy: string;
}
