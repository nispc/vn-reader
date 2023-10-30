import { AuthService } from './../service/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherForecastService } from '../service/weather-forecast.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private weatherForecastService = inject(WeatherForecastService);
  private authService = inject(AuthService);

  constructor() {}

  public items: Array<any> = [];

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  getWeatherForecast($event: Event){
    $event.preventDefault();
    this.weatherForecastService.getWeatherForecast().subscribe((data) => {
      this.items = data;
    });
  }

  login($event: Event){
    this.authService.login('nessy', 'Test@123').subscribe((data) => {
      console.log(data);
    });
  }
}
