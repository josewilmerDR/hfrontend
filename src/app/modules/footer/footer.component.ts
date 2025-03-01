import { Component, OnInit } from '@angular/core';

//importar la variable path que está declarada en el archivo config.js que está en dos niveles arriba de mi ruta actual, en la carpeta app
//el archivo debe ser ts, no funciona js
import {Path} from '../../config';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  //variable que almacena la ruta de la imagen
  path:String = Path.url;

  constructor(){
    //asignar la ruta de la imagen a la variable path
    this.path = Path.url;
  }

  ngOnInit(): void {
  }

}
