import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GraphData } from '../model/graphData';
import { ItemsState } from '../store/items/items.state';

@Component({
  selector: 'frontend-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Select(ItemsState.groupedItems) groupedItems$: Observable<string[]>;

  public data: GraphData[];

  constructor() {
    this.data = [];
  }

  ngOnInit(): void {
    this.groupedItems$.subscribe((items) => {
      Object.keys(items).forEach((i) => {
        if (this.data.every((d) => d.name !== i)) {
          this.data.push({ name: i, value: items[i].length });
        }
      });
    });
  }
}
