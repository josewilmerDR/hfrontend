import { Component, OnInit } from '@angular/core';
//importar la variable path que está declarada en el archivo config.js que está en dos niveles arriba de mi ruta actual, en la carpeta app
//el archivo debe ser ts, no funciona js
import {Path} from '../../config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  //CREAR UN COMPONENTE DE EMPLO PARA MOSTRAR Y TESTEAR QUE ESTE COMPONENTE SE RENDERIZA EN EL APP.COMPONENT.HTML
  path:String = Path.url;
  title = 'Header';
  constructor() { 
    console.log(this.path);
    
  }
  ngOnInit(): void {
    console.log('HeaderComponent ngOnInit');
  }

}
