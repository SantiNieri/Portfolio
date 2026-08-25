import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectosService } from '../../services/proyectos';

@Component({
  selector: 'app-nuevo-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './nuevo-proyecto.html',
  styleUrl: './nuevo-proyecto.css'
})
export class NuevoProyecto {
  private fb = inject(FormBuilder);
  private proyectosService = inject(ProyectosService);
  private router = inject(Router);

  enviando = signal(false);
  error = signal(false);

  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    github: [
      '',
      [Validators.required, Validators.pattern(/^https:\/\/github\.com\/.+/)]
    ]
  });

  get nombre() { return this.formulario.controls.nombre; }
  get descripcion() { return this.formulario.controls.descripcion; }
  get github() { return this.formulario.controls.github; }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.error.set(false);

    this.proyectosService.crearProyecto(this.formulario.getRawValue()).subscribe({
      next: () => {
        this.enviando.set(false);
        this.router.navigate(['/proyectos']);
      },
      error: () => {
        this.enviando.set(false);
        this.error.set(true);
      }
    });
  }
}
