import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../config';


@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
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
  getFilterSubCategories(orderBy: string, equalTo: string): Observable<any> {
    return this.http.get<any>(`${this.api}sub-categories.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
  }
}
