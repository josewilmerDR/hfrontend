import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Path } from '../../config';
import { CategoriesService } from '../../services/categories.service'; // Servicio para obtener categorías
import { CommonModule } from '@angular/common';   // Para directivas como *ngFor, *ngIf
import { RouterModule } from '@angular/router';   // Para la navegación y directiva routerLink
import { SubCategoriesService } from '../../services/sub-categories.service'; // Servicio para obtener subcategorías


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
  selector: 'app-header-mobile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.css'
})

export class HeaderMobileComponent implements OnInit {

	path:String = Path.url;	
	categories:Category [] = [];
	render:Boolean = true;
	categoriesList:Array<any> = [];

	constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) { }

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

		})

		/*=============================================
		Activamos el efecto toggle en el listado de subcategorías
		=============================================*/

		$(document).on("click", ".sub-toggle", function(this: any){

			$(this).parent().children('ul').toggle();

		})

	}

	/*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/

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
							

							$(`[category='${category}']`).append(

								`<li class="current-menu-item ">
		              <a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>
		            </li>`

		          )


						}

					}											

				})

			})			
			
		}

	}

}

