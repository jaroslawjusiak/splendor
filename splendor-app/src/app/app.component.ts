import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public itemsData: Item[] = [];
  private items: Observable<any[]>;
  constructor(firestore: AngularFirestore,
    private http: HttpClient) {
    
    
    this.items = firestore.collection('items').valueChanges();

    this.items.subscribe({
      next: (data) => {
        console.log('data', data);
        this.itemsData = data;
      },
      error: (error)=> console.log('error', error)
    })
  }
}

export interface Item{
  name: string,
  value: number
}