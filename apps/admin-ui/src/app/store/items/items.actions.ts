import { Item } from '../../model/item';

export class FetchAllItems {
  static readonly type = '[Items] Fetch All Items';
}

export class UpdateItem {
  static readonly type = '[Items] Update Item';
  constructor(public id: string, public item: Item) {}
}
