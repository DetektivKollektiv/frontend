import { group } from '@angular/animations';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { groupBy, mergeMap } from 'rxjs/operators';
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
