import {Component, ChangeDetectionStrategy, signal, computed} from '@angular/core';
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

interface CartItem {
  medication: Medication;
  quantity: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="px-6 py-10 md:px-12 pb-32 max-w-6xl mx-auto relative">
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
          <button (click)="toggleTracking(true)" class="w-full md:w-auto px-8 py-3 bg-natural-text-dark text-white rounded-2xl font-medium transition-all hover:bg-black active:scale-95">
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
                  <div class="flex items-center gap-2">
                    @if (getItemQuantity(med.id) > 0) {
                      <button (click)="decreaseQuantity(med.id)" class="w-8 h-8 rounded-lg bg-natural-sidebar text-natural-primary flex items-center justify-center font-bold font-sans hover:bg-natural-border transition-colors">
                        -
                      </button>
                      <span class="font-bold text-sm text-natural-text-dark px-1">{{ getItemQuantity(med.id) }}</span>
                    }
                    <button (click)="addToCart(med)" class="w-8 h-8 rounded-lg bg-natural-primary text-white flex items-center justify-center font-bold font-sans hover:bg-natural-text-dark transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Carrito Flotante Amigable -->
      @if (totalItems() > 0) {
        <div class="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white rounded-3xl shadow-xl border border-natural-border p-5 z-40 animate-fade-in flex flex-col gap-4">
          <div class="flex justify-between items-center border-b border-natural-border pb-3">
            <div class="flex items-center gap-2">
              <mat-icon class="text-natural-primary">shopping_bag</mat-icon>
              <span class="font-bold text-natural-text-dark">Resumen de Entrega</span>
            </div>
            <button (click)="clearCart()" class="text-xs text-natural-accent font-semibold hover:underline">
              Vaciar
            </button>
          </div>
          
          <div class="max-h-32 overflow-y-auto space-y-2">
            @for (item of cart(); track item.medication.id) {
              <div class="flex justify-between items-center text-sm">
                <span class="text-natural-text-dark">{{ item.medication.name }} x{{ item.quantity }}</span>
                <span class="font-mono font-medium text-natural-text-muted">{{ (item.medication.price * item.quantity) | currency:'USD' }}</span>
              </div>
            }
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-natural-border">
            <div>
              <p class="text-xs text-natural-text-muted">Total a Pagar</p>
              <p class="text-xl font-bold text-natural-primary font-mono">{{ totalPrice() | currency:'USD' }}</p>
            </div>
            <button (click)="checkout()" class="px-6 py-3 bg-natural-primary text-white font-bold rounded-2xl hover:bg-natural-text-dark transition-all active:scale-95 shadow-md">
              Confirmar Entrega
            </button>
          </div>
        </div>
      }

      <!-- Modal de Rastrear Amigable -->
      @if (showTracking()) {
        <div class="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div class="bg-[#FAF9F6] w-full max-w-md rounded-[36px] shadow-2xl p-8 border border-natural-border flex flex-col">
            <div class="flex justify-between items-center mb-6">
              <span class="text-[10px] uppercase tracking-widest text-natural-accent font-bold">Estado en Tiempo Real</span>
              <button (click)="toggleTracking(false)" class="w-8 h-8 rounded-full bg-natural-sidebar text-natural-text-dark flex items-center justify-center font-bold hover:bg-natural-border">
                ✕
              </button>
            </div>

            <h3 class="text-2xl font-bold text-natural-text-dark mb-2">Pedido #4829</h3>
            <p class="text-sm text-natural-text-muted mb-8">Ubicación actual: Av. Principal con Calle 10</p>

            <!-- Línea de Progreso Natural -->
            <div class="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-natural-border">
              
              <div class="flex gap-4 relative">
                <div class="w-10 h-10 rounded-full bg-natural-primary text-white flex items-center justify-center font-bold z-10 shadow-sm">
                  ✓
                </div>
                <div>
                  <h4 class="font-bold text-natural-text-dark text-sm">Preparado en Farmacia</h4>
                  <p class="text-[11px] text-natural-text-muted">10:05 AM • Verificado con receta</p>
                </div>
              </div>

              <div class="flex gap-4 relative">
                <div class="w-10 h-10 rounded-full bg-natural-primary text-white flex items-center justify-center font-bold z-10 shadow-sm">
                  ✓
                </div>
                <div>
                  <h4 class="font-bold text-natural-text-dark text-sm">Asignado a Repartidor</h4>
                  <p class="text-[11px] text-natural-text-muted">10:12 AM • Carlos Gómez (Moto 02)</p>
                </div>
              </div>

              <div class="flex gap-4 relative">
                <div class="w-10 h-10 rounded-full bg-natural-accent text-white flex items-center justify-center font-bold z-10 shadow-sm">
                  🏍
                </div>
                <div>
                  <h4 class="font-bold text-natural-accent text-sm">En Camino</h4>
                  <p class="text-[11px] text-natural-text-muted">De camino a tu ubicación • Llega a las 10:35 AM</p>
                </div>
              </div>

              <div class="flex gap-4 relative opacity-40">
                <div class="w-10 h-10 rounded-full bg-natural-border text-natural-text-muted flex items-center justify-center font-bold z-10">
                  🏠
                </div>
                <div>
                  <h4 class="font-bold text-natural-text-dark text-sm">Entregado</h4>
                  <p class="text-[11px] text-natural-text-muted">Entrega programada sin contacto</p>
                </div>
              </div>

            </div>

            <button (click)="toggleTracking(false)" class="mt-8 w-full py-4 bg-natural-text-dark text-white rounded-2xl font-bold">
              Entendido
            </button>
          </div>
        </div>
      }

      <!-- Modal Exitoso de Checkout -->
      @if (showSuccessCheckout()) {
        <div class="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div class="bg-white w-full max-w-sm rounded-[36px] shadow-2xl p-8 border border-natural-border text-center flex flex-col items-center">
            <div class="w-16 h-16 bg-natural-sidebar rounded-full flex items-center justify-center text-natural-primary text-3xl mb-4">
              ✓
            </div>
            <h3 class="text-xl font-bold text-natural-text-dark mb-2">¡Pedido Solicitado!</h3>
            <p class="text-sm text-natural-text-muted leading-relaxed mb-6">
              Hemos registrado tu entrega. El equipo de farmacia está verificando tus medicamentos ahora mismo.
            </p>
            <button (click)="closeCheckout()" class="w-full py-4 bg-natural-primary text-white rounded-2xl font-bold">
              Seguir Comprando
            </button>
          </div>
        </div>
      }
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

  cart = signal<CartItem[]>([]);
  showTracking = signal(false);
  showSuccessCheckout = signal(false);

  totalItems = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));
  totalPrice = computed(() => this.cart().reduce((sum, item) => sum + item.medication.price * item.quantity, 0));

  addToCart(medication: Medication) {
    this.cart.update(currentCart => {
      const existing = currentCart.find(item => item.medication.id === medication.id);
      if (existing) {
        return currentCart.map(item => 
          item.medication.id === medication.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { medication, quantity: 1 }];
    });
  }

  decreaseQuantity(medicationId: string) {
    this.cart.update(currentCart => {
      const existing = currentCart.find(item => item.medication.id === medicationId);
      if (existing && existing.quantity > 1) {
        return currentCart.map(item => 
          item.medication.id === medicationId 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return currentCart.filter(item => item.medication.id !== medicationId);
    });
  }

  getItemQuantity(medicationId: string): number {
    const item = this.cart().find(i => i.medication.id === medicationId);
    return item ? item.quantity : 0;
  }

  clearCart() {
    this.cart.set([]);
  }

  toggleTracking(show: boolean) {
    this.showTracking.set(show);
  }

  checkout() {
    this.showSuccessCheckout.set(true);
    this.clearCart();
  }

  closeCheckout() {
    this.showSuccessCheckout.set(false);
  }
}

