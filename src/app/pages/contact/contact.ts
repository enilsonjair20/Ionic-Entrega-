import {Component, ChangeDetectionStrategy, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';

interface SubmittedMessage {
  id: string;
  nombre: string;
  email: string;
  asunto: string;
  pedidoId?: string;
  mensaje: string;
  fecha: Date;
  estado: 'Recibido' | 'En revisión' | 'Respondido';
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <div class="px-6 py-10 md:px-12 pb-32 max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-10">
        <h1 class="text-3xl font-bold text-natural-text-dark tracking-tight">Contacto</h1>
        <p class="text-natural-text-muted text-sm">Estamos aquí para ayudarte 24/7 y resolver todo sobre tus recetas y pedidos.</p>
      </header>

      <!-- Grid Principal: Canales de contacto rápidos + Formulario Reactivo -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Tarjetas de Información Lateral (Col 4) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white p-6 rounded-[28px] border border-natural-border flex items-start space-x-4 shadow-sm transition-all hover:bg-natural-sidebar/20">
            <div class="w-12 h-12 bg-natural-sidebar rounded-xl flex items-center justify-center flex-none">
              <mat-icon class="text-natural-primary !text-xl">phone</mat-icon>
            </div>
            <div>
              <h3 class="font-bold text-natural-text-dark text-sm">Soporte Telefónico</h3>
              <p class="text-xs text-natural-text-muted mt-1">Llámanos gratis al 01-800-MEDILINK</p>
              <p class="text-natural-primary text-xs font-bold mt-2 cursor-pointer hover:underline">Llamar ahora</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-[28px] border border-natural-border flex items-start space-x-4 shadow-sm transition-all hover:bg-natural-sidebar/20">
            <div class="w-12 h-12 bg-natural-sidebar rounded-xl flex items-center justify-center flex-none">
              <mat-icon class="text-natural-primary !text-xl">chat</mat-icon>
            </div>
            <div>
              <h3 class="font-bold text-natural-text-dark text-sm">WhatsApp Medilink</h3>
              <p class="text-xs text-natural-text-muted mt-1">Chatea inmediatamente con un experto.</p>
              <p class="text-natural-primary text-xs font-bold mt-2 cursor-pointer hover:underline">Iniciar chat</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-[28px] border border-natural-border flex items-start space-x-4 shadow-sm transition-all hover:bg-natural-sidebar/20">
            <div class="w-12 h-12 bg-natural-sidebar rounded-xl flex items-center justify-center flex-none text-xl">📧</div>
            <div>
              <h3 class="font-bold text-natural-text-dark text-sm">Contacto por Email</h3>
              <p class="text-xs text-natural-text-muted mt-1">Responderemos detalladamente en menos de 2 horas.</p>
              <p class="text-natural-accent text-xs font-bold mt-2 cursor-pointer hover:underline">soporte&#64;medilink.com</p>
            </div>
          </div>
        </div>

        <!-- Formulario Reactivo de Angular (Col 7) -->
        <div class="lg:col-span-7 bg-white p-8 rounded-[36px] border border-natural-border shadow-sm">
          <div class="mb-6">
            <span class="text-[10px] uppercase tracking-widest text-natural-accent font-bold">Usa el sistema de Soporte</span>
            <h2 class="text-xl font-bold text-natural-text-dark mt-1">Formulario de Soporte y Recetas</h2>
            <p class="text-xs text-natural-text-muted mt-1">Diligencia tus datos completos para atenderte oportunamente.</p>
          </div>

          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <!-- Nombre Completo -->
            <div>
              <label for="fullName" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block mb-1.5">Nombre Completo</label>
              <input 
                id="fullName" 
                type="text" 
                formControlName="fullName"
                placeholder="Ej. Juan Dueñas"
                class="w-full px-5 py-3 rounded-xl border bg-natural-bg/30 text-sm font-sans focus:outline-none focus:ring-2 transition-all"
                [class.border-red-400]="isFieldInvalid('fullName')"
                [class.focus:ring-red-200]="isFieldInvalid('fullName')"
                [class.border-natural-border]="!isFieldInvalid('fullName')"
                [class.focus:ring-natural-sidebar]="!isFieldInvalid('fullName')"
              />
              @if (isFieldInvalid('fullName')) {
                <span class="text-[11px] text-red-500 font-semibold block mt-1">El nombre completo es requerido.</span>
              }
            </div>

            <!-- Email y Pedido (Fila responsive) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Correo electrónico -->
              <div>
                <label for="userEmail" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block mb-1.5">Correo Electrónico</label>
                <input 
                  id="userEmail" 
                  type="email" 
                  formControlName="userEmail"
                  placeholder="juan@ejemplo.com"
                  class="w-full px-5 py-3 rounded-xl border bg-natural-bg/30 text-sm font-sans focus:outline-none focus:ring-2 transition-all"
                  [class.border-red-400]="isFieldInvalid('userEmail')"
                  [class.focus:ring-red-200]="isFieldInvalid('userEmail')"
                  [class.border-natural-border]="!isFieldInvalid('userEmail')"
                  [class.focus:ring-natural-sidebar]="!isFieldInvalid('userEmail')"
                />
                @if (isFieldInvalid('userEmail')) {
                  <span class="text-[11px] text-red-500 font-semibold block mt-1">Ingresa un correo electrónico válido.</span>
                }
              </div>

              <!-- Número de Pedido (Opcional) -->
              <div>
                <label for="orderId" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block mb-1.5">Nº de Pedido (Opcional)</label>
                <input 
                  id="orderId" 
                  type="text" 
                  formControlName="orderId"
                  placeholder="Ej. #4829"
                  class="w-full px-5 py-3 rounded-xl border border-natural-border bg-natural-bg/30 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-natural-sidebar transition-all"
                />
              </div>
            </div>

            <!-- Asunto / Motivo -->
            <div>
              <label for="subject" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block mb-1.5">Asunto de Consulta</label>
              <select 
                id="subject" 
                formControlName="subject"
                class="w-full px-5 py-3 rounded-xl border bg-natural-bg/30 text-sm font-sans focus:outline-none focus:ring-2 transition-all cursor-pointer appearance-none"
                [class.border-red-400]="isFieldInvalid('subject')"
                [class.focus:ring-red-200]="isFieldInvalid('subject')"
                [class.border-natural-border]="!isFieldInvalid('subject')"
                [class.focus:ring-natural-sidebar]="!isFieldInvalid('subject')"
              >
                <option value="" disabled selected>Selecciona un motivo...</option>
                <option value="Pedido retrasado">Demora o retraso de entrega de pedido</option>
                <option value="Inquietud médica">Consulta con farmacéutico / Receta médica</option>
                <option value="Problema app">Instabilidad o error en la aplicación</option>
                <option value="Sugerencias">Aportes y Sugerencias de Experiencia</option>
                <option value="Cobro erróneo">Dudas de facturación / reembolso</option>
              </select>
              @if (isFieldInvalid('subject')) {
                <span class="text-[11px] text-red-500 font-semibold block mt-1">Por favor selecciona un motivo válido.</span>
              }
            </div>

            <!-- Mensaje principal -->
            <div>
              <div class="flex justify-between items-center mb-1.5">
                <label for="messageBody" class="text-[10px] font-bold uppercase tracking-widest text-natural-text-muted block">Mensaje o Detalle</label>
                <span class="text-[10px] text-natural-text-muted font-mono">{{ messageLength }} / 500 caract.</span>
              </div>
              <textarea 
                id="messageBody" 
                formControlName="messageBody"
                rows="4"
                placeholder="Escribe tu mensaje con detalles aquí..."
                class="w-full px-5 py-3 rounded-xl border bg-natural-bg/30 text-sm font-sans focus:outline-none focus:ring-2 transition-all resize-none"
                [class.border-red-400]="isFieldInvalid('messageBody')"
                [class.focus:ring-red-200]="isFieldInvalid('messageBody')"
                [class.border-natural-border]="!isFieldInvalid('messageBody')"
                [class.focus:ring-natural-sidebar]="!isFieldInvalid('messageBody')"
              ></textarea>
              @if (isFieldInvalid('messageBody')) {
                <span class="text-[11px] text-red-500 font-semibold block mt-1">Mínimo 15 caracteres requeridos.</span>
              }
            </div>

            <!-- Botón de Envío -->
            <button 
              type="submit" 
              class="w-full py-4 bg-natural-primary text-white font-bold rounded-2xl shadow-lg shadow-natural-primary/10 hover:bg-natural-text-dark transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <mat-icon class="!text-lg">send</mat-icon>
              <span>Enviar Formulario</span>
            </button>
          </form>
        </div>

      </div>

      <!-- Sección de Mensajes Recientes (Visualización Interactiva / Enlace Académico) -->
      @if (sentMessages().length > 0) {
        <section class="mt-12 bg-natural-sidebar/20 p-8 rounded-[36px] border border-natural-border animate-fade-in">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-2.5 h-2.5 rounded-full bg-natural-accent animate-pulse"></span>
            <h3 class="text-base font-bold text-natural-text-dark">Mensajes Enviados en esta Sesión</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @for (msg of sentMessages(); track msg.id) {
              <div class="bg-white p-5 rounded-2xl border border-natural-border/60 shadow-sm relative">
                <span class="absolute top-4 right-4 text-[9px] px-2.5 py-1 rounded-full font-bold uppercase"
                      [class.bg-yellow-100]="msg.estado === 'Recibido'"
                      [class.text-yellow-800]="msg.estado === 'Recibido'">
                  {{ msg.estado }}
                </span>
                <p class="text-xs text-natural-accent font-bold uppercase tracking-wider mb-1">{{ msg.asunto }}</p>
                <div class="text-sm font-bold text-natural-text-dark mb-1">{{ msg.nombre }}</div>
                <div class="text-[11px] text-natural-text-muted mb-3 font-mono">{{ msg.email }} @if(msg.pedidoId){ • Pedido: {{ msg.pedidoId }} }</div>
                <p class="text-xs text-natural-text-muted italic bg-natural-bg/40 p-3 rounded-lg border border-dashed border-natural-border mb-2">
                  "{{ msg.mensaje }}"
                </p>
                <span class="text-[9px] text-natural-text-muted block mt-1">Enviado a las {{ msg.fecha | date:'h:mm:ss a' }}</span>
              </div>
            }
          </div>
        </section>
      }

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
                <div class="p-6 pt-0 border-t border-natural-border/30 text-xs text-natural-text-muted leading-relaxed font-sans">
                  {{ faq.a }}
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Toast Flotante ÉXITO -->
      @if (showSuccessSnackbar()) {
        <div class="fixed top-6 left-1/2 -translate-x-1/2 bg-natural-primary text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <mat-icon class="text-green-200">check_circle</mat-icon>
          <div class="text-left font-sans text-xs">
            <span class="font-bold block text-sm">¡Mensaje Recibido!</span>
            <span>Estudiando tu caso. Responderemos de inmediato.</span>
          </div>
        </div>
      }

      <!-- Footer Info -->
      <div class="mt-16 text-center">
        <p class="text-[10px] text-natural-text-muted uppercase tracking-widest font-mono">Panel Académico • Proyecto medilink</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  activeFaq = signal<number | null>(null);
  showSuccessSnackbar = signal(false);
  
  // Array de mensajes enviados en esta sesión para demostrar el flujo de datos del Formulario
  sentMessages = signal<SubmittedMessage[]>([]);

  // Formulario Reactivo de Angular con validaciones rigurosas
  contactForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    orderId: new FormControl(''),
    subject: new FormControl('', [Validators.required]),
    messageBody: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(500)]),
  });

  faqs = [
    { q: '¿Cuánto tarda el envío?', a: 'Usualmente entre 30 y 60 minutos dependiendo de tu ubicación.' },
    { q: '¿Necesito receta médica?', a: 'Solo para medicamentos de control especial. Puedes subirla con tu teléfono al momento del pago o entregarla físicamente al repartidor.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'Tarjetas de crédito, débito, efectivo a la entrega, transferencias y pago rápido express mediante billeteras electrónicas.' }
  ];

  // Longitud en caracteres en tiempo real para el contador del textarea
  get messageLength(): number {
    return this.contactForm.get('messageBody')?.value?.length || 0;
  }

  toggleFaq(idx: number) {
    if (this.activeFaq() === idx) {
      this.activeFaq.set(null);
    } else {
      this.activeFaq.set(idx);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const rawValue = this.contactForm.getRawValue();
      
      const newMessage: SubmittedMessage = {
        id: Math.random().toString(36).substring(2, 9),
        nombre: rawValue.fullName || '',
        email: rawValue.userEmail || '',
        asunto: rawValue.subject || '',
        pedidoId: rawValue.orderId || undefined,
        mensaje: rawValue.messageBody || '',
        fecha: new Date(),
        estado: 'Recibido'
      };

      // Adjuntar a la lista reactiva de mensajes de la sesión
      this.sentMessages.update(list => [newMessage, ...list]);

      // Feedback del snackbar animado
      this.showSuccessSnackbar.set(true);

      // Reiniciar formulario y limpiar estados touched/dirty
      this.contactForm.reset({
        fullName: '',
        userEmail: '',
        orderId: '',
        subject: '',
        messageBody: ''
      });

      setTimeout(() => {
        this.showSuccessSnackbar.set(false);
      }, 4000);
    } else {
      // Marcar todo como touched para detonar señales de validación visuales
      this.contactForm.markAllAsTouched();
    }
  }
}

