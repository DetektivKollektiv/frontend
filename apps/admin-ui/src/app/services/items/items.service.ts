import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { API } from 'aws-amplify';
import { Item } from '../../model/item';

@Injectable()
export class ItemsService {
  public getAllItems(): Observable<Item[]> {
    return from(API.get('admin_service', '/items', {}));
  }

  public updateItem(id: string, item: Item): Observable<Item> {
    
    // TODO: Find better solution. Problem: Using Aplify's API request doesn't correctly parse the JSON into an item. 
    delete item['open_timestamp'];
    delete item['close_timestamp'];

    return from(API.put('admin_service', `/items/${id}`, { body: item }));
  }
}
