import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service'; // Servicio para obtener categorías
import { CommonModule } from '@angular/common';   // Para directivas como *ngFor, *ngIf
import { RouterModule } from '@angular/router';   // Para la navegación y directiva routerLink
import { SubCategoriesService } from '../../services/sub-categories.service'; // Servicio para obtener subcategorías

//importar la variable path que está declarada en el archivo config.js que está en dos niveles arriba de mi ruta actual, en la carpeta app
//el archivo debe ser ts, no funciona js
import {Path} from '../../config';



// Declara variables para jQuery
declare var jQuery: any;
declare var $: any;

/**
 * Interfaz que define la estructura de datos de una categoría
 */
interface Category {
  icon?: string;       // Clase CSS del icono
  image?: string;      // URL de la imagen de la categoría
  name: string;        // Nombre de la categoría (obligatorio)
  title_list?: string; // Título para la lista de elementos
  url?: string;        // URL para la navegación
  view?: number;       // Contador de vistas
}

@Component({
  selector: 'app-footer',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  //variable que almacena la ruta de la imagen
  path:String = Path.url;
  categories:Category [] = [];
  render:Boolean = true;
  categoriesList:Array<any> = [];

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService){
    //asignar la ruta de la imagen a la variable path
    this.path = Path.url;
    
  }

  ngOnInit(): void {
    /*=============================================
		Tomamos la data de las categorías
		=============================================*/

		this.categoriesService.getCategories()
		.subscribe(resp => {
			
			this.categories = resp;

      /*=============================================
			Recorrido por el objeto de la data de categorías
			=============================================*/

			let i;

			for(i in resp){

				/*=============================================
				Separamos los nombres de categorías
				=============================================*/

				this.categoriesList.push(resp[i].name)

			}


    });
  }

  callback(){

		if(this.render){

			this.render = false;
			let arraySubCategories = [];

			/*=============================================
			Separar las categorías
			=============================================*/

			this.categoriesList.forEach(category=>{
				
				/*=============================================
				Tomamos la colección de las sub-categorías filtrando con los nombres de categoría
				=============================================*/

				this.subCategoriesService.getFilterSubCategories("category", category)
				.subscribe(resp=>{
					/*=============================================
					Hacemos un recorrido por la colección general de subcategorias y clasificamos las subcategorias y url
					de acuerdo a la categoría que correspondan
					=============================================*/
					let i;

					for(i in resp){

						arraySubCategories.push({

							"category": resp[i].category,
							"subcategory": resp[i].name,
							"url": resp[i].url

						})

					}

					/*=============================================
					Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorías
					=============================================*/

					for(i in arraySubCategories){

						if(category == arraySubCategories[i].category){
							

							$(`[category-footer='${category}']`).after(

								`
		              <a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>
		            `

		          )


						}

					}											

				})

			})			
			
		}

	}

}