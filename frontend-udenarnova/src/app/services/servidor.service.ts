import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servidor {
  id?: number;
  nombre_host: string;
  direccion_ip: string;
  tipo_servidor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  private apiUrl = 'http://127.0.0.1:8000/api/servidores/';

  constructor(private http: HttpClient) { }

  getServidores(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  crearServidor(servidor: Servidor): Observable<Servidor> {
    return this.http.post<Servidor>(this.apiUrl, servidor);
  }

  actualizarServidor(id: number, servidor: Servidor): Observable<Servidor> {
    return this.http.put<Servidor>(`${this.apiUrl}${id}/`, servidor);
  }

  eliminarServidor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
