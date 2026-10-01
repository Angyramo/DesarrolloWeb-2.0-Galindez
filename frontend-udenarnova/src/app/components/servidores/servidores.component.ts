import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServidorService, Servidor } from '../../services/servidor.service';

@Component({
  selector: 'app-servidores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servidores.component.html'
})
export class ServidoresComponent implements OnInit {
  servidores: Servidor[] = [];
  servidorForm: Servidor = { nombre_host: '', direccion_ip: '', tipo_servidor: 'web' };
  editando: boolean = false;
  idEdicion: number | null = null;

  constructor(private servidorService: ServidorService) {}

  ngOnInit(): void {
    this.cargarServidores();
  }

  cargarServidores(): void {
    this.servidorService.getServidores().subscribe({
      next: (data) => {
        this.servidores = data.results ? data.results : data;
      },
      error: (err) => console.error('Error al cargar servidores:', err)
    });
  }

  guardarServidor(): void {
    // Si estamos editando y tenemos un ID válido
    if (this.editando && this.idEdicion !== null) {
      this.servidorService.actualizarServidor(this.idEdicion, this.servidorForm).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarServidores();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el servidor. Revisa los datos.');
        }
      });
    } else {
      // Si es un nuevo registro
      // Aseguramos remover el id para evitar conflictos con Django
      const nuevoServidor = { ...this.servidorForm };
      delete nuevoServidor.id;

      this.servidorService.crearServidor(nuevoServidor).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarServidores();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Error al crear el servidor. Revisa que la IP no esté repetida o los campos estén completos.');
        }
      });
    }
  }

  seleccionarParaEditar(servidor: Servidor): void {
    this.editando = true;
    this.idEdicion = servidor.id || null;
    this.servidorForm = { ...servidor };
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Deseas eliminar este servidor?')) {
      this.servidorService.eliminarServidor(id).subscribe({
        next: () => this.cargarServidores(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  limpiarFormulario(): void {
    this.editando = false;
    this.idEdicion = null;
    this.servidorForm = { nombre_host: '', direccion_ip: '', tipo_servidor: 'web' };
  }
}
