import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  constructor(private storage: StorageMap) {}

  public saveValue(value: string) {
    this.storage.set('myKey', value).subscribe(() => {
      console.log('Value saved to local storage - ', value);
    });
  }

  public getValue(): Observable<any> {
    return this.storage.get('myKey');
  }

  fetchValue(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getValue().subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
