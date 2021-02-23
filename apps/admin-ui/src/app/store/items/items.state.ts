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
export class ItemsState /*implements NgxsOnInit*/ {
  @Selector()
  static allItems(state: ItemsStateModel) {
    return state.items;
  }

  @Selector()
  static unconfirmedItems(state: ItemsStateModel) {
    return state.items.filter((s) => s.status === 'unconfirmed');
  }

  @Selector()
  static openItems(state: ItemsStateModel) {
    return state.items.filter((s) => s.status === 'open');
  }

  @Selector()
  static closedItems(state: ItemsStateModel) {
    return state.items.filter((s) => s.status === 'closed');
  }

  constructor(private itemsService: ItemsService) {}

  // ngxsOnInit(ctx?: StateContext<ItemsStateModel>) {
  //   ctx.dispatch(new FetchAllItems());
  // }

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
