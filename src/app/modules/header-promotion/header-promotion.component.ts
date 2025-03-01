import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Path } from '../../config';
import { ProductsService } from '../../services/products.service';
import { Subscription, catchError, finalize, of } from 'rxjs';

// Interfaces para definir la estructura de datos
interface TopBanner {
  'IMG tag': string;  // URL de la imagen
  'H3 tag': string;   // Texto del encabezado H3
  'P1 tag': string;   // Texto del primer párrafo
  'H4 tag': string;   // Texto del encabezado H4
  'P2 tag': string;   // Texto del segundo párrafo
  'Span tag': string; // Texto del span
  'Button tag': string; // Texto del botón
}

// Define la estructura de los datos de productos
interface ProductData {
  top_banner: string; // JSON serializado con datos del banner
  [key: string]: any; // Permitir otras propiedades
}

@Component({
  selector: 'app-header-promotion', // Nombre del componente en HTML
  standalone: true, // Es un componente independiente
  imports: [CommonModule], // Módulos necesarios
  templateUrl: './header-promotion.component.html',
  styleUrl: './header-promotion.component.css'
})
export class HeaderPromotionComponent implements OnInit, OnDestroy {
  // Variables del componente
  path: string = Path.url; // URL base para las imágenes
  topBanner: TopBanner | null = null; // Datos del banner (null si no hay datos)
  preloader = true; // Controla si se muestra el spinner de carga
  
  private subscription: Subscription | null = null; // Gestiona la suscripción a los datos

  constructor(private productsService: ProductsService) {}

  // Se ejecuta cuando se inicia el componente
  ngOnInit(): void {
    this.loadBannerData(); // Carga los datos del banner
  }

  // Limpieza cuando se destruye el componente
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Cancela la suscripción para evitar pérdidas de memoria
    }
  }

  private loadBannerData(): void {
    // Obtiene los datos desde el servicio y maneja posibles errores
    this.subscription = this.productsService.getData().pipe(
      catchError(error => {
        console.error('Error loading banner data:', error); // Registra errores
        return of(null); // Devuelve un valor nulo en caso de error
      }),
      finalize(() => this.preloader = false) // Siempre oculta el preloader al finalizar
    ).subscribe(resp => {
      if (!resp) return; // Si no hay respuesta, termina aquí
      
      try {
        const data = resp as Record<string, ProductData>; // Convierte la respuesta al tipo esperado
        const dataArray = Object.values(data); // Convierte el objeto a un array
        
        if (dataArray.length === 0) return; // Si no hay datos, termina aquí

        // Selecciona un elemento aleatorio del array
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        const randomItem = dataArray[randomIndex];
        
        if (randomItem && randomItem.top_banner) {
          // Convierte el string JSON a objeto JavaScript
          this.topBanner = JSON.parse(randomItem.top_banner);
        }
      } catch (error) {
        // Captura errores durante el procesamiento de datos
        console.error('Error processing banner data:', error);
      }
    });
  }
}
