import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, BackgroundImage } from '../../../functions';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // Para la navegación y directiva routerLink

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home-promotions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-promotions.component.html',
  styleUrl: './home-promotions.component.css'
})
export class HomePromotionsComponent implements OnInit {
 // Variables del componente
 path: string = Path.url; // URL base para las imágenes
 home_promotions: Array<any> = []; // Arreglo para guardar los banners
 category: Array<any> = []; // Arreglo para guardar las categorías
 url: Array<any> = []; // Arreglo para guardar las URL de las categorias
 render: Boolean = true; // Variable para renderizar el componente
 preloader = false; // Controla si se muestra el spinner de carga

 constructor(private productsService: ProductsService) { }

 ngOnInit(): void {
   this.preloader = true;
   this.productsService.getData().subscribe(resp => {

     let index = 0;
     
     //Tomar la longitud del objeto
     let i;
     let size = 0;
     for(i in resp){
       size++;
     }

     //Generar un numero aleatorio si el tamaño del objeto es mayor a 5
     if(size > 2){
       index = Math.floor(Math.random() * (size - 2));
     }


    //Seleccionar data de productos con limites
     this.productsService.getLimitData(Object.keys(resp)[index], 2).subscribe((resp: {[key: string]: any}) => {
       
       //Recorrer la data de productos
       let i;
       for(i in resp){
         this.home_promotions.push(resp[i].default_banner);
         this.category.push(resp[i].category);
         this.url.push(resp[i].url);

         this.preloader = false;
       }
     })
   })

 } 
}
