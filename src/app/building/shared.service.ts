import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Building } from './building';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private buildingSource = new BehaviorSubject<any>(null);
  currentBuilding = this.buildingSource.asObservable();

  constructor() { }

  setBuilding(building: Building) {
    this.buildingSource.next(building);
  }
}
