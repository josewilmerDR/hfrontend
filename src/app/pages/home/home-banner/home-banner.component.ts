import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig } from '../../../functions';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // Para la navegación y directiva routerLink
import { fakeAsync } from '@angular/core/testing';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.css'
})
export class HomeBannerComponent implements OnInit {
  // Variables del componente
  path: string = Path.url; // URL base para las imágenes
  home_banner: Array<any> = []; // Arreglo para guardar los banners
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
      if(size > 5){
        index = Math.floor(Math.random() * (size - 5));
      }

 
     //Seleccionar data de productos con limites
      this.productsService.getLimitData(Object.keys(resp)[index],5).subscribe((resp: {[key: string]: any}) => {
        
        //Recorrer la data de productos
        let i;
        for(i in resp){
          this.home_banner.push(JSON.parse(resp[i].horizontal_slider));
          this.category.push(resp[i].category);
          this.url.push(resp[i].url);

          this.preloader = false;
        }
      })
    })

  }

  //Funcion que nos avisa cuando termina el renderizado de Angular
  callback() {
    if(this.render) {
      this.render = false;

      //Activar el carrusel
      // OwlCarouselConfig.fnc();
       // Importante: usa setTimeout para asegurarte de que el DOM está listo
       setTimeout(() => {
        // Inicializar el carrusel de forma segura
        this.OwlCarouselConfig.fnc();
        
        // Otra opción podría ser simplemente:
        // $('.owl-slider').owlCarousel({...configuración...});
      }, 100);
    }
  }
  OwlCarouselConfig = OwlCarouselConfig;
  
}
