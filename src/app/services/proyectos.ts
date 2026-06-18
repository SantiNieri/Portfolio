import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) {}

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(
      'assets/data/proyectos.json'
    );
  }
}