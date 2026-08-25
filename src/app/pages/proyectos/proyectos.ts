import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Proyecto } from '../../models/proyecto';
import { ProyectosService } from '../../services/proyectos';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class Proyectos implements OnInit {
  private proyectosService = inject(ProyectosService);

  proyectos = signal<Proyecto[]>([]);
  cargando = signal(true);
  error = signal(false);
  eliminandoId = signal<string | null>(null);

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.cargando.set(true);
    this.error.set(false);
    this.proyectosService.obtenerProyectos().subscribe({
      next: (datos) => {
        this.proyectos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }

  eliminar(proyecto: Proyecto): void {
    if (!proyecto.id) return;
    this.eliminandoId.set(proyecto.id);
    this.proyectosService.eliminarProyecto(proyecto.id).subscribe({
      next: () => {
        this.eliminandoId.set(null);
        this.cargarProyectos();
      },
      error: () => {
        this.eliminandoId.set(null);
        this.error.set(true);
      }
    });
  }
}
