import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  menuAbierto = signal(false);

  toggleMenu(): void {
    this.menuAbierto.update(valor => !valor);
  }

  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
