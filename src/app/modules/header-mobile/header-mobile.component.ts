import { Component, OnInit } from '@angular/core';
import {Path} from '../../config';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [], 
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.css'
})
export class HeaderMobileComponent implements OnInit{
path:String = Path.url;

constructor(){
this.path = Path.url;
}

ngOnInit(): void {
    
}

}
