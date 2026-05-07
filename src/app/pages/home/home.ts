import {Component, ChangeDetectionStrategy, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

interface Medication {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="px-6 py-10 md:px-12 pb-32 max-w-6xl mx-auto">
      <!-- Header -->
      <header class="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 class="text-3xl font-light text-natural-text-dark">Hola, <span class="font-semibold text-natural-text-dark">Juan</span></h2>
          <p class="text-natural-text-muted">Tu bienestar es nuestra prioridad hoy.</p>
        </div>
        <div class="bg-white rounded-2xl p-1.5 shadow-sm border border-natural-border flex items-center max-w-sm w-full">
          <input type="text" placeholder="Buscar medicamento..." class="bg-transparent border-none outline-none px-4 py-2 w-full text-sm text-natural-text-dark">
          <button class="bg-natural-primary text-white p-2 rounded-xl flex items-center justify-center transition-transform active:scale-95">
            <mat-icon class="!text-xl">search</mat-icon>
          </button>
        </div>
      </header>

      <!-- Pedido Activo (Design Pattern) -->
      <section class="mb-10">
        <div class="bg-[#F9F5EF] border-2 border-dashed border-[#D4CDBB] rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div class="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden flex-none">
             <mat-icon class="text-natural-accent !text-4xl">local_shipping</mat-icon>
          </div>
          <div class="flex-grow text-center md:text-left">
            <span class="text-[10px] uppercase tracking-widest text-natural-accent font-bold">En Camino</span>
            <h3 class="text-xl font-bold text-natural-text-dark">Pedido #4829 — Insulina & Gasas</h3>
            <p class="text-sm text-natural-text-muted mt-1">Repartidor: Carlos Gómez • Llega en 12 min</p>
          </div>
          <button class="w-full md:w-auto px-8 py-3 bg-natural-text-dark text-white rounded-2xl font-medium transition-all hover:bg-black active:scale-95">
            Rastrear
          </button>
        </div>
      </section>

      <!-- Categorías -->
      <section class="mb-10">
        <h2 class="text-xs font-bold uppercase tracking-widest text-natural-text-muted mb-5">Categorías</h2>
        <div class="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          @for (cat of categories(); track cat) {
            <button class="flex-none px-6 py-2.5 rounded-2xl bg-white border border-natural-border text-sm font-medium text-natural-text-muted hover:bg-natural-sidebar hover:text-natural-primary transition-all">
              {{ cat }}
            </button>
          }
        </div>
      </section>

      <!-- Lista de Medicamentos -->
      <section>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xs font-bold uppercase tracking-widest text-natural-text-muted">Recomendados</h2>
          <button class="text-natural-primary text-sm font-semibold">Ver Todo</button>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          @for (med of medications(); track med.id) {
            <div class="bg-white p-6 rounded-[32px] shadow-sm border border-natural-border flex gap-5 transition-all hover:shadow-md">
              <div class="w-24 h-24 bg-natural-sidebar rounded-2xl flex-none overflow-hidden relative">
                <img [src]="med.image" [alt]="med.name" class="w-full h-full object-cover">
              </div>
              <div class="flex-1 flex flex-col justify-center">
                <h3 class="font-bold text-natural-text-dark">{{ med.name }}</h3>
                <p class="text-xs text-natural-text-muted line-clamp-1 mb-2">{{ med.description }}</p>
                <div class="mt-auto flex items-center justify-between">
                  <span class="text-natural-primary font-bold font-mono text-lg">{{ med.price | currency:'USD' }}</span>
                  <button mat-icon-button class="!bg-natural-sidebar !text-natural-primary !w-9 !h-9">
                    <mat-icon class="!text-xl">add</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  categories = signal(['Todos', 'Gripa', 'Digestión', 'Cuidado Piel', 'Vitaminas']);
  
  medications = signal<Medication[]>([
    {
      id: '1',
      name: 'Aspirina 500mg',
      description: 'Analgésico y antipirético para alivio del dolor.',
      price: 5.50,
      image: 'https://picsum.photos/seed/aspirin/200/200',
      category: 'General'
    },
    {
      id: '2',
      name: 'Amoxicilina 500mg',
      description: 'Antibiótico de amplio espectro.',
      price: 12.00,
      image: 'https://picsum.photos/seed/antibiotic/200/200',
      category: 'Antibióticos'
    },
    {
      id: '3',
      name: 'Jarabe para la Tos',
      description: 'Alivio instantáneo para la tos seca y productiva.',
      price: 8.75,
      image: 'https://picsum.photos/seed/syrup/200/200',
      category: 'Gripa'
    },
    {
      id: '4',
      name: 'Vitamina C 1000mg',
      description: 'Refuerzo para el sistema inmunológico.',
      price: 15.00,
      image: 'https://picsum.photos/seed/vitaminc/200/200',
      category: 'Vitaminas'
    }
  ]);
}
