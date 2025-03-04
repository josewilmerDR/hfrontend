import { Component } from '@angular/core';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { HomePromotionsComponent } from './home-promotions/home-promotions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeBannerComponent, HomeFeaturesComponent, HomePromotionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
