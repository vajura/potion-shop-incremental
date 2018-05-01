import { ObjectType } from '../enums/object-type-enum';

export interface ObjectCollection<T> {
  type: T;
  amount?: number;
}
