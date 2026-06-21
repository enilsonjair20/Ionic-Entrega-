import {Component, ChangeDetectionStrategy, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="px-6 py-10 md:px-12 pb-32 max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-10">
        <h1 class="text-3xl font-bold text-natural-text-dark tracking-tight">Contacto</h1>
        <p class="text-natural-text-muted text-sm">Estamos aquí para ayudarte 24/7.</p>
      </header>

      <!-- Contact Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-8 rounded-[32px] border border-natural-border flex items-start space-x-5 shadow-sm transition-all hover:bg-natural-sidebar/20">
          <div class="w-14 h-14 bg-natural-sidebar rounded-2xl flex items-center justify-center flex-none">
            <mat-icon class="text-natural-primary !text-2xl">phone</mat-icon>
          </div>
          <div>
            <h3 class="font-bold text-natural-text-dark">Atención Telefónica</h3>
            <p class="text-sm text-natural-text-muted mt-1">Llámanos gratis al 01-800-MEDILINK</p>
            <p class="text-natural-primary font-bold mt-3 cursor-pointer hover:underline">Llamar ahora</p>
          </div>
        </div>

        <div class="bg-white p-8 rounded-[32px] border border-natural-border flex items-start space-x-5 shadow-sm transition-all hover:bg-natural-sidebar/20">
          <div class="w-14 h-14 bg-natural-sidebar rounded-2xl flex items-center justify-center flex-none">
            <mat-icon class="text-natural-primary !text-2xl">chat</mat-icon>
          </div>
          <div>
            <h3 class="font-bold text-natural-text-dark">WhatsApp</h3>
            <p class="text-sm text-natural-text-muted mt-1">Chat en vivo con un asesor.</p>
            <p class="text-natural-primary font-bold mt-3 cursor-pointer hover:underline">Enviar mensaje</p>
          </div>
        </div>

        <div class="bg-white p-8 rounded-[32px] border border-natural-border flex items-start space-x-5 shadow-sm transition-all hover:bg-natural-sidebar/20 md:col-span-2">
          <div class="w-14 h-14 bg-natural-sidebar rounded-2xl flex items-center justify-center flex-none text-2xl">📧</div>
          <div>
            <h3 class="font-bold text-natural-text-dark">Correo Electrónico</h3>
            <p class="text-sm text-natural-text-muted mt-1">Nuestro equipo responde en menos de 2 horas.</p>
            <p class="text-natural-accent font-bold mt-3 cursor-pointer hover:underline px-4 py-2 bg-natural-bg rounded-xl inline-block">soporte&#64;medilink.com</p>
          </div>
        </div>
      </div>

      <!-- FAQ Section Accordion -->
      <section class="mt-16">
        <h2 class="text-xs font-bold uppercase tracking-widest text-natural-text-muted mb-6">Preguntas Frecuentes</h2>
        <div class="flex flex-col gap-4">
          @for (faq of faqs; track faq.q; let idx = $index) {
            <div class="bg-white rounded-3xl border border-natural-border overflow-hidden transition-all duration-300"
                 [class.shadow-md]="activeFaq() === idx">
              <button (click)="toggleFaq(idx)" 
                      class="w-full p-6 text-left flex items-center justify-between text-natural-text-dark font-bold text-sm focus:outline-none transition-colors hover:bg-natural-sidebar/10">
                <span>{{ faq.q }}</span>
                <span class="text-natural-primary text-lg transition-transform duration-300"
                      [style.transform]="activeFaq() === idx ? 'rotate(180deg)' : 'rotate(0)'">
                  ▼
                </span>
              </button>
              
              <div class="transition-all duration-300 overflow-hidden"
                   [style.max-height]="activeFaq() === idx ? '150px' : '0px'">
                <div class="p-6 pt-0 border-t border-natural-border/30 text-xs text-natural-text-muted leading-relaxed">
                  {{ faq.a }}
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Footer Info (Design Patch) -->
      <div class="mt-16 text-center">
        <p class="text-[10px] text-natural-text-muted uppercase tracking-widest">Versión App: 2.4.0 Natural</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  activeFaq = signal<number | null>(null);

  faqs = [
    { q: '¿Cuánto tarda el envío?', a: 'Usualmente entre 30 y 60 minutos dependiendo de tu ubicación.' },
    { q: '¿Necesito receta médica?', a: 'Solo para medicamentos de control especial. Puedes subirla con tu teléfono al momento del pago o entregarla físicamente al repartidor.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'Tarjetas de crédito, débito, efectivo a la entrega, transferencias y pago rápido express mediante billeteras electrónicas.' }
  ];

  toggleFaq(idx: number) {
    if (this.activeFaq() === idx) {
      this.activeFaq.set(null);
    } else {
      this.activeFaq.set(idx);
    }
  }
}
