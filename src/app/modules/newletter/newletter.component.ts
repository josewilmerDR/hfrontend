import { Component, OnInit } from '@angular/core';
import {Path} from '../../config';

@Component({
  selector: 'app-newletter',
  standalone: true,
  imports: [],
  templateUrl: './newletter.component.html',
  styleUrl: './newletter.component.css'
})
export class NewletterComponent implements OnInit{
  path:String = Path.url;
  constructor(){
    this.path = Path.url;
  }
  ngOnInit(): void {
  }


}
