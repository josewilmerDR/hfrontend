import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // Para la navegación y directiva routerLink
import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox, CountDown, Rating } from '../../../functions';
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

      //Seleccionamos del DOM los elementos de las oferta
      let offer_1 = $(".offer_1");
      let offer_2 = $(".offer_2");
      let offer_3 = $(".offer_3");

      //Seleccionamos del DOM los elementos de la reseña
      let review_1 = $(".review_1");
      let review_2 = $(".review_2");
      let review_3 = $(".review_3");



      // //Recorremos todos los indeces de productos en oferta
      for (let i = 0; i < galleryMix_1.length; i++) {
        //RELACIONADO CON LA GALERIA MIXTA

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

        //RELACIONADO CON LAS OFERTAS

        //Capturamos el array de ofertas de cada producto
        let offer = JSON.parse($(offer_1[i]).attr("offer"));

        //Capturamos el precio de cada producto
        let price = Number($(offer_1[i]).attr("price"));

        //Preguntamos si la oferta es del tipo descuento o fijo 

        if (offer[0] == "Disccount") {
          //Calculamos el precio con descuento

          $(offer_1[i]).html(

            `<span>Save <br> $${(price * offer[1] / 100).toFixed(2)}</span>`

          );

          $(offer_2[i]).html(`$${(price - (price * offer[1] / 100)).toFixed(2)}`);
        }

        //Preguntamos si la oferta es del tipo fijo
        if (offer[0] == "Fixed") {
          //Calculamos el precio con descuento
          $(offer_1[i]).html(

            `<span>Save <br> $${offer[1]}</span>`

          );

          $(offer_2[i]).html(`$${(price - offer[1]).toFixed(2)}`);

        }

        //Agregamos la fecha al descontador de la fecha
        $(offer_3[i]).attr("data-time",
          new Date(
            parseInt(offer[2].split('-')[0]),
            parseInt(offer[2].split('-')[1]) - 1,
            parseInt(offer[2].split('-')[2])
          )
        );

        //RELACIONADO CON LAS RESEÑAS

        //Calculamos el total de las calificaciones de las reseñas
        let totalReview = 0;
        for (let f = 0; f < JSON.parse($(review_1[i]).attr("reviews")).length; f++) {
          totalReview += Number(JSON.parse($(review_1[i]).attr("reviews"))[f]["review"]);

        }

        //Imprimimos el total de las reseñas para cada producto
        let rating = Math.round(totalReview / JSON.parse($(review_1[i]).attr("reviews")).length);
        $(review_3[i]).html(rating);

        for (let f = 0; f <= 5; f++) {
          
            $(review_2[i]).append(`<option value="2">${f}</option>`);
            
            if(rating == f){
              $(review_2[i]).children('option').val(1);
            }
        }
      }

      //Efecutar funciones globales con respecto a la galeria Mixta
      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
      SlickConfig.fnc();
      ProductLightbox.fnc();

      //Ejecutamos la funcion global de contador regresivo
      setTimeout(() => {
        // console.log("Inicializando contadores después de establecer todos los data-time");
        CountDown.fnc();
      }, 100);

      //Ejecutamos la funcion global de calificación de las reseñas
      Rating.fnc();

    }
  }


}
