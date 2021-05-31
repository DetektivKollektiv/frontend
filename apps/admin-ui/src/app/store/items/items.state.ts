import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Item } from '../../model/item';
import { ItemsService } from '../../services/items/items.service';
import { FetchAllItems, UpdateItem } from './items.actions';
import { patch, updateItem } from '@ngxs/store/operators';

export class ItemsStateModel {
  public items: Item[];
}

@State<ItemsStateModel>({
  name: 'items',
  defaults: {
    items: [],
  },
})
@Injectable()
export class ItemsState {
  @Selector()
  static groupedItems(state: ItemsStateModel) {
    return state.items.reduce((acc, val) => {
      if (!acc[val.status]) {
        acc[val.status] = [];
      }

      acc[val.status].push(val);

      return acc;
    }, {});
  }

  @Selector()
  static allItems(state: ItemsStateModel) {
    return state.items;
  }

  constructor(private itemsService: ItemsService) {}

  @Action(FetchAllItems)
  fetchAllItems({ patchState }: StateContext<ItemsStateModel>) {
    return this.itemsService.getAllItems().pipe(
      tap((items) => {
        patchState({ items: items });
      })
    );
  }

  @Action(UpdateItem)
  updateItem({ setState }: StateContext<ItemsStateModel>, action: UpdateItem) {
    return this.itemsService.updateItem(action.id, action.item).pipe(
      tap((updateResult) => {
        setState(
          patch({
            items: updateItem((item) => item.id === action.id, updateResult),
          })
        );
      })
    );
  }
}
