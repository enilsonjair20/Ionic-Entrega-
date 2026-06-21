import {Component, ChangeDetectionStrategy, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <div class="px-6 py-10 md:px-12 pb-32 max-w-2xl mx-auto relative">
      <!-- Header -->
      <header class="mb-10 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-natural-text-dark tracking-tight">Mi Perfil</h1>
          <p class="text-natural-text-muted text-sm">Gestiona tus datos y direcciones.</p>
        </div>
        <div class="w-14 h-14 bg-natural-sidebar rounded-2xl flex items-center justify-center border border-natural-border">
          <mat-icon class="text-natural-primary !text-3xl">person</mat-icon>
        </div>
      </header>

      <!-- Formulario de Información Personal -->
      <div class="bg-white p-8 rounded-[32px] border border-natural-border shadow-sm">
        <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="space-y-6">
          <div>
            <label for="name" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block mb-2">Nombre Completo</label>
            <input id="name" type="text" formControlName="name" 
                   class="w-full px-4 py-3 bg-natural-bg border border-natural-border rounded-xl focus:outline-none focus:ring-2 focus:ring-natural-primary/20 focus:border-natural-primary transition-all text-natural-text-dark font-medium">
          </div>

          <div>
            <label for="address" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block mb-2">Dirección de Entrega</label>
            <input id="address" type="text" formControlName="address" 
                   class="w-full px-4 py-3 bg-natural-bg border border-natural-border rounded-xl focus:outline-none focus:ring-2 focus:ring-natural-primary/20 focus:border-natural-primary transition-all text-natural-text-dark font-medium">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="phone" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block mb-2">Teléfono</label>
              <input id="phone" type="tel" formControlName="phone" 
                     class="w-full px-4 py-3 bg-natural-bg border border-natural-border rounded-xl focus:outline-none focus:ring-2 focus:ring-natural-primary/20 focus:border-natural-primary transition-all text-natural-text-dark font-medium">
            </div>

            <div>
              <label for="email" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block mb-2">Correo Electrónico</label>
              <input id="email" type="email" formControlName="email" 
                     class="w-full px-4 py-3 bg-natural-bg border border-natural-border rounded-xl focus:outline-none focus:ring-2 focus:ring-natural-primary/20 focus:border-natural-primary transition-all text-natural-text-dark font-medium">
            </div>
          </div>

          <button type="submit" class="w-full py-4 bg-natural-primary text-white font-bold rounded-2xl shadow-lg shadow-natural-primary/20 hover:bg-natural-text-dark transition-all active:scale-95 cursor-pointer">
            Guardar Cambios
          </button>
        </form>
      </div>

      <!-- Mis Pedidos -->
      <section class="mt-12">
        <h2 class="text-xs font-bold uppercase tracking-widest text-natural-text-muted mb-5">Historial Reciente</h2>
        <div class="space-y-3">
          <div class="bg-white p-5 rounded-2xl border border-natural-border flex items-center justify-between transition-all hover:bg-natural-sidebar/30">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-natural-sidebar rounded-xl flex items-center justify-center">
                <mat-icon class="text-natural-primary !text-xl">check_circle</mat-icon>
              </div>
              <div>
                <p class="font-bold text-natural-text-dark">Pedido #8492</p>
                <p class="text-[10px] text-natural-text-muted uppercase tracking-wider">Entregado • 02 de Mayo</p>
              </div>
            </div>
            <mat-icon class="text-natural-border">chevron_right</mat-icon>
          </div>
        </div>
      </section>

      <!-- Toast Flotante -->
      @if (showSavedToast()) {
        <div class="fixed top-6 left-1/2 -translate-x-1/2 bg-natural-primary text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 z-50 animate-bounce">
          <mat-icon>check_circle</mat-icon>
          <span class="text-sm font-semibold">¡Cambios guardados con éxito!</span>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  showSavedToast = signal(false);

  profileForm = new FormGroup({
    name: new FormControl('Juan Dueñas', Validators.required),
    address: new FormControl('Calle Roble 452, CDMX', Validators.required),
    phone: new FormControl('+52 55 1234 5678', Validators.required),
    email: new FormControl('juan.duenas@ejemplo.com', [Validators.required, Validators.email]),
  });

  saveProfile() {
    if (this.profileForm.valid) {
      this.showSavedToast.set(true);
      setTimeout(() => {
        this.showSavedToast.set(false);
      }, 3000);
    }
  }
}
