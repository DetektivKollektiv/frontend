import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent, LoaderService } from '@frontend/ui';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Item } from '../../model/item';
import { UpdateItem } from '../../store/items/items.actions';
import { ItemsState } from '../../store/items/items.state';

@Component({
  selector: 'frontend-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ItemsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public displayedColumns: string[] = [
    'select',
    'content',
    'status',
    'open_timestamp',
    'language',
  ];

  public expandedElement: Item | null;

  public selection = new SelectionModel<Item>(true, []);
  public dataSource = new MatTableDataSource<Item>();

  public selectedState: string;

  @Select(ItemsState.allItems) items$: Observable<Item[]>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.items$.subscribe((items) => {
      this.dataSource.data = items;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach((row) =>
          this.selection.select(row)
        );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateState() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure?',
        message: `Do you really want to set ${this.selection.selected.length} item(s) to ${this.selectedState}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loader.show();

        this.selection.selected.forEach((item) => {
          const newItem = { ...item, status: this.selectedState };

          this.store.dispatch(new UpdateItem(item.id, newItem));
        });

        this.selection.clear();
        this.loader.hide();
      }
    });
  }
}
