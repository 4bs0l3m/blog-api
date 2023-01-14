export interface IDataFilter {
  fields: { fieldName: string; operator: string; value: string }[];
  sorts: { fieldName: string; order: number }[];
  limit: number;
  skip: number;
  condition: 'and' | 'or';
}
