import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private showNavBar = new BehaviorSubject<boolean>(true);
  public showNavBar$ = this.showNavBar.asObservable();

  constructor() { }

  setNavBarVisibility(isVisible: boolean) {
    this.showNavBar.next(isVisible);
  }
}
