import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Building } from './building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBuilding(): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.apiServerUrl}/api/buildings`);
  }

  public getBuildingById(buildingIdId: number): Observable<Building>{
    return this.http.get<Building>(`${this.apiServerUrl}/api/buildings/${buildingIdId}`);
}
}