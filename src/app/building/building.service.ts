import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Building } from './building';


@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBuilding(): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.apiServerUrl}/api/buildings`);
  }

  public getBuildingById(buildingId: number | null): Observable<Building> {
    return this.http.get<Building>(`${this.apiServerUrl}/api/buildings/${buildingId}`);
  }

  public addBuilding(building: Building): Observable<Building> {
    return this.http.post<Building>(`${this.apiServerUrl}/api/buildings/add`, building).pipe(
      catchError(this.handleError)
    )
  }

  public editBuilding(buildingId: number, building: Building):Observable<Building>{
    return this.http.put<Building>(`${this.apiServerUrl}/api/buildings/edit/${buildingId}`, building).pipe(
      catchError(this.handleError)
    )
  }

  public deleteBuildingById(buildingId: number): Observable<Building> {
    return this.http.delete<Building>(`${this.apiServerUrl}/api/buildings/delete/${buildingId}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle error based on the status code or error message
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  public getMyPosts(dataJson: any): Observable<Building[]> {
    return this.http.post<Building[]>(`${this.apiServerUrl}/api/myposts`, dataJson);
  }

  public getAllPosts(dataJson: any): Observable<Building[]> {
    return this.http.post<Building[]>(`${this.apiServerUrl}/api/allposts`, dataJson);
  }

  public addInfavorites(dataJson: any):Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/api/favorites/add`, dataJson);
  }

  public deleteFromFavorites(buildingId: number, username: String):Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/favorites/delete/${buildingId}/${username}`);
  }


}