import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  assetValues: any[] = [
    {assetType: 'Equity',purchasePrice: 1, quantity: 1},
    {assetType: '"Gold"',purchasePrice: 1, quantity: 1},
    {assetType: '"Bond"',purchasePrice: 1, quantity: 1},
    {assetType: '"Real Estate"',purchasePrice: 1, quantity: 1},
  ];

  public chartValues : BehaviorSubject<any> = new BehaviorSubject<any>(this.assetValues);
  constructor() { }
}
