import { Component, OnInit, OnDestroy } from '@angular/core';
import { Path } from '../../config';              // Importa configuración de rutas
import { CommonModule } from '@angular/common';   // Para directivas como *ngFor, *ngIf
import { RouterModule } from '@angular/router';   // Para la navegación y directiva routerLink
import { CategoriesService } from '../../services/categories.service'; // Servicio para obtener categorías
import { SubCategoriesService } from '../../services/sub-categories.service'; // Servicio para obtener subcategorías
import { Subscription } from 'rxjs';

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

/**
 * Interfaz para subcategorías
 */
interface SubCategory {
  title_list: string;  // Título de la lista a la que pertenece
  name: string;        // Nombre de la subcategoría
  url: string;         // URL para la navegación
}

/**
 * Componente para el encabezado principal de la aplicación
 */
@Component({
  selector: 'app-header',      
  standalone: true,            
  imports: [
    CommonModule,              
    RouterModule               
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  /** URL base para imágenes y recursos */
  path: string = Path.url;

  /** Título del componente */
  title = 'Header';

  /** Lista de categorías que se mostrarán en el menú */
  categories: Category[] = [];

  /** Lista de títulos organizados por categoría */
  arrayTitleList: Array<any> = [];

  /** Control para ejecutar callback solo una vez */
  render: boolean = true;
  
  /** Subscripciones para limpiar al destruir el componente */
  private subscriptions: Subscription = new Subscription();
 
  /**
   * Constructor del componente
   */
  constructor(
    private categoriesService: CategoriesService, 
    private subCategoriesService: SubCategoriesService
  ) { }

  /**
   * Método del ciclo de vida que se ejecuta cuando se inicializa el componente
   */
  ngOnInit(): void {
    const subscription = this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = Array.isArray(data) ? data : Object.values(data);

        // Procesar los títulos de las listas para cada categoría
        for (let i in data) {
          try {
            this.arrayTitleList.push(JSON.parse(data[i].title_list));
          } catch (e) {
            console.error('Error al parsear title_list:', e);
            this.arrayTitleList.push([]);
          }
        }
      },
      error: (error) => { 
        console.error('Error al cargar categorías:', error); 
      }
    });
    
    this.subscriptions.add(subscription);
  }
  
  /**
   * Limpia las suscripciones cuando el componente se destruye
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Función que se llama después del renderizado para cargar subcategorías
   * Esta función mantiene la lógica y estructura original pero con mejoras
   * para legibilidad, tipado y manejo de errores
   */
  callback() {
    if (!this.render) return; // Evita múltiples ejecuciones
    
    console.log('Iniciando carga de subcategorías');
    this.render = false;
    
    // Almacena todas las subcategorías procesadas
    let arraySubCategories: any[] = [];
    
    // Contador para seguimiento de operaciones asíncronas
    let pendingRequests = 0;
    
    // Procesar cada lista de títulos por categoría
    this.arrayTitleList.forEach((titleList, categoryIndex) => {
      console.log(`Procesando categoría ${categoryIndex} con ${titleList.length} títulos`);
      
      // Procesar cada título en la lista
      for (let i in titleList) {
        pendingRequests++;
        
        // Obtener subcategorías para este título
        const subscription = this.subCategoriesService
          .getFilterSubCategories('title_list', titleList[i])
          .subscribe({
            next: (data: any[]) => {
              console.log(`Recibidas ${data.length} subcategorías para "${titleList[i]}"`);
              
              // Guardar datos recibidos
              arraySubCategories.push(data);
              
              // Procesar subcategorías
              this.processSubcategories(arraySubCategories, titleList, i);
              
              pendingRequests--;
              console.log(`Peticiones pendientes: ${pendingRequests}`);
            },
            error: (error) => {
              console.error(`Error al cargar subcategorías para ${titleList[i]}:`, error);
              pendingRequests--;
            }
          });
          
        this.subscriptions.add(subscription);
      }
    });
  }
  
  /**
   * Procesa las subcategorías recibidas y las muestra en el DOM
   * @param arraySubCategories Array con todas las subcategorías recibidas
   * @param titleList Lista de títulos de la categoría actual
   * @param titleIndex Índice del título actual en la lista
   */
  private processSubcategories(arraySubCategories: any[], titleList: any, titleIndex: string): void {
    try {
      // Colección para organizar subcategorías por título
      let arrayTitleName: SubCategory[] = [];
      
      // Procesar todas las subcategorías recibidas
      for (let j in arraySubCategories) {
        for (let k in arraySubCategories[j]) {
          const item = arraySubCategories[j][k];
          
          // Verificar que el objeto tiene la estructura esperada
          if (item && item.title_list && item.name && item.url) {
            arrayTitleName.push({
              title_list: item.title_list,
              name: item.name,
              url: item.url
            });
          }
        }
      }
      
      // Filtrar subcategorías que coinciden con el título actual
      const currentTitle = titleList[titleIndex];
      const matchingSubcategories = arrayTitleName.filter(
        item => item.title_list === currentTitle
      );
      
      console.log(`Encontradas ${matchingSubcategories.length} subcategorías para "${currentTitle}"`);
      
      // Seleccionar el elemento del DOM para este título
      const $element = $(`[titleList='${currentTitle}']`);
      
      if ($element.length === 0) {
        console.warn(`No se encontró elemento DOM para el título "${currentTitle}"`);
        return;
      }
      
      // Limpiar contenido existente para evitar duplicados
      $element.empty();
      
      // Añadir cada subcategoría al elemento correspondiente
      matchingSubcategories.forEach(sub => {
        $element.append(`
          <li>
            <a href="products/${sub.url}">${sub.name}</a>
          </li>
        `);
      });
    } catch (error) {
      console.error('Error al procesar subcategorías:', error);
    }
  }
}
