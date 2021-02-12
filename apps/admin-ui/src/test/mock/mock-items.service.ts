import { Observable, of } from 'rxjs';
import { Item } from '../../app/model/item';

export class MockItemsService {
  public getAllItems(): Observable<Item[]> {
    return of([]);
  }
}
