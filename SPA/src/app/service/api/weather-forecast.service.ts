import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiHost}`;

  getWeatherForecast() {
    return this.http.get<any[]>(`${this.apiUrl}/WeatherForecast`);
  }
}
