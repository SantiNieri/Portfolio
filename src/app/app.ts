import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Proyecto } from './models/proyecto';
import { ProyectosService } from './services/proyectos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  proyectos: Proyecto[] = [];

  constructor(private proyectosService: ProyectosService) {
    this.proyectosService.obtenerProyectos().subscribe(data => {
      this.proyectos = data;
    });
  }
}