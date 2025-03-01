import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';              // Importa configuración de rutas
import { CommonModule } from '@angular/common';   // Para directivas como *ngFor, *ngIf
import { CategoriesService } from '../../services/categories.service'; // Servicio para obtener categorías
import { RouterModule } from '@angular/router';   // Para la navegación y directiva routerLink

/**
 * Interfaz que define la estructura de datos de una categoría
 * Las propiedades marcadas con ? son opcionales
 */
interface Category {
  icon?: string;       // Clase CSS del icono
  image?: string;      // URL de la imagen de la categoría
  name: string;        // Nombre de la categoría (obligatorio)
  title_list?: string; // Título para la lista de elementos
  url?: string;        // URL para la navegación
  view?: number;       // Contador de vistas
}

/**
 * Componente para el encabezado principal de la aplicación
 * Muestra el menú de categorías y otras opciones de navegación
 */
@Component({
  selector: 'app-header',       // Etiqueta HTML para usar el componente
  standalone: true,             // Componente autónomo (no requiere un módulo)
  imports: [
    CommonModule,               // Para directivas estructurales (ngFor, ngIf)
    RouterModule                // Para navegación y directiva routerLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  /** URL base para imágenes y recursos */
  path: string = Path.url;

  /** Título del componente */
  title = 'Header';

  /** Lista de categorías que se mostrarán en el menú */
  categories: Category[] = [];

  // Lista de títulos de las listas
  arrayTitleList: Array<any> = [];

  render: boolean = true;

  /**
   * Constructor del componente
   * @param categoriesService Servicio inyectado para obtener los datos de categorías
   */
  constructor(private categoriesService: CategoriesService) { }

  /**
   * Método del ciclo de vida que se ejecuta cuando se inicializa el componente
   * Aquí cargamos los datos de categorías desde el servicio
   */
  ngOnInit(): void {
    // Suscripción para obtener las categorías desde el API
    this.categoriesService.getCategories().subscribe(
      // Callback que se ejecuta cuando llegan los datos
      (data) => {
        // Guardamos los datos en la propiedad categories
        // Lo ideal sería convertir los datos con Object.values() si data no es un array
        this.categories = Array.isArray(data) ? data : Object.values(data);

        let i
        for (i in data) {
          //Separamos los títulos de las listas de elementos
          this.arrayTitleList.push(JSON.parse(data[i].title_list))
        }

      },
      // Manejo de errores:
      (error) => { console.error('Error al cargar categorías:', error); }
    );
  }
  //Funcion que nos avisa cuanddo finaliza el renderizado de angular
  callback() {
    if (this.render) {
      this.render = false;
      
      this.arrayTitleList.forEach(titleList => {
        //Separar individualmente los títulos de las listas
        for (let i in titleList) {
          //Mostramos los títulos de las listas
          console.log(titleList[i])
        }
      })


    }
  }
}