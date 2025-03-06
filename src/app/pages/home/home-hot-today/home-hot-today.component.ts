import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // Para la navegación y directiva routerLink
import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox } from '../../../functions';
import { ProductsService } from '../../../services/products.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-home-hot-today',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-hot-today.component.html',
  styleUrl: './home-hot-today.component.css'
})
export class HomeHotTodayComponent implements OnInit {
  path: String = Path.url;
  indexes: Array<any> = [];
  products: Array<any> = [];
  render: Boolean = true;
  preloader = false; 

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.preloader = true;
    let getProducts = [];
    let today = new Date();
    let offerDate = null;
    //TOMAMOS LA DATA DE LOS PRODUCTOS
    this.productService.getData().subscribe((resp: Record<string, any>) => {
      
      //Recoremos cada producto para separar las ofertas y el stock
      let i;
      for (i in resp) {
        getProducts.push({
          "offer": JSON.parse(resp[i].offer),
          "stock": resp[i].stock
        });

        this.products.push(resp[i]);

      }

      //Recorremos cada oferta y stock para clasificar las ofertas actuales y los productos que 
      //si tienen stock

      for (i in getProducts) {
        offerDate = new Date(
          parseInt(getProducts[i]["offer"][2].split('-')[0]),
          parseInt(getProducts[i]["offer"][2].split('-')[1]) - 1,
          parseInt(getProducts[i]["offer"][2].split('-')[2])
        );

        if (today < offerDate && getProducts[i]["stock"] > 0) {
          this.indexes.push(i);
          this.preloader = false;
        }
      }

    })

  }


  //Funcion que nos avisa cuando termina el renderizado de Angular
  callback() {
    if (this.render) {
      this.render = false;

      //Seleccionamos del DOM los elementos de la galeria Mixta
      let galleryMix_1 = $(".galleryMix_1");
      let galleryMix_2 = $(".galleryMix_2");
      let galleryMix_3 = $(".galleryMix_3");

      // //Recorremos todos los indeces de productos en oferta
      for (let i = 0; i < galleryMix_1.length; i++) {
         //Recorremos todas las fotografias de la galeria de cada producto
        for (let f = 0; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length; f++) {
      //Agregar imagenes grandes
          $(galleryMix_2[i]).append(
          `<div class="item">
            <a href="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
              <img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
            </a>
          </div>`
          );

          //Agregar imagenes pequeñas

          $(galleryMix_3[i]).append(
            `<div class="item">
              <img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
            </div>`
          );

        }

        


      }

      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
      SlickConfig.fnc();
      ProductLightbox.fnc();

    }
  }

  
}
