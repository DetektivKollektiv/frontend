import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { ItemsState } from '../store/items/items.state';

@Component({
  selector: 'frontend-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Select(ItemsState.openItems) openItems$: Observable<Item[]>;
  @Select(ItemsState.closedItems) closedItems$: Observable<Item[]>;
  @Select(ItemsState.unconfirmedItems) unconfirmedItems$: Observable<Item[]>;
}
