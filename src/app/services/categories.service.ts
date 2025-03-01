import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../config';

/**
 * Servicio para gestionar las categorías de productos
 * 
 * Este servicio proporciona métodos para interactuar con la API de categorías,
 * obteniendo datos de las categorías disponibles en la aplicación.
 */
@Injectable({
  providedIn: 'root' // El servicio es accesible en toda la aplicación
})

export class CategoriesService {
  /**
   * URL base para las peticiones a la API
   * @private
   */
  private api: string = Api.url;

  /**
   * Constructor del servicio
   * @param http Instancia de HttpClient para realizar peticiones HTTP
   */
  constructor(private http: HttpClient) { }
  
  /**
   * Obtiene todas las categorías disponibles
   * 
   * @returns Un Observable con los datos de categorías de la API
   */
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.api}categories.json`);
  }
}