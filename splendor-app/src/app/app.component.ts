import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import cardsData from "../data/cards.json";
import { Card } from './model/card';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  public itemsData: Item[] = [];
  private items: Observable<any[]>;
  
  private cards: Array<Card>;
  
  
  constructor(private firestore: AngularFirestore) {
    this.cards = [];
    
    this.items = this.firestore.collection('items').valueChanges();

    this.items.subscribe({
      next: (data) => {
        console.log('data', data);
        this.itemsData = data;
      },
      error: (error)=> console.log('error', error)
    })


  }
  ngOnInit(): void {
    if(!(this.cards.length > 0)){
      this.cards = cardsData as Array<Card>;      
    }
  }
}

export interface Item{
  name: string,
  value: number
}