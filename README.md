# Medilink — Entrega de Medicamentos (Natural Tones)

Una aplicación web moderna, accesible y elegante inspirada en la paleta **Natural Tones** (tonos tierra, verdes y beiges suaves), ideal para la gestión y entrega rápida de medicamentos a domicilio.

Este proyecto ha sido optimizado con **Angular v21.x** (Zoneless, componentes Standalone, Signal State Management) y **Tailwind CSS v4** para ofrecer el mejor rendimiento y la máxima velocidad de carga.

---

## 🚀 Requisitos Previos

Antes de abrir y ejecutar el proyecto localmente en tu ordenador, asegúrate de tener instalado:

1. **Node.js**: Se recomienda la versión activa de LTS v20 o v22 (o superior).  
   *Puedes descargarla desde [nodejs.org](https://nodejs.org/).*
2. **Administrador de paquetes**: `npm` (se instala automáticamente con Node.js).
3. **Editor de Código**: **Visual Studio Code (VS Code)**.

---

## 🛠️ Cómo abrir y ejecutar en Visual Studio Code (Paso a Paso)

Sigue estos sencillos pasos para que todo funcione de maravilla en tu equipo local:

### Paso 1: Abrir el proyecto en VS Code
1. Abre tu terminal o el explorador de archivos.
2. Abre la carpeta del proyecto directamente con Visual Studio Code:
   * Puedes abrir VS Code, presionar `Ctrl + O` (o `Cmd + O` en macOS), seleccionar la carpeta del proyecto y hacer clic en **Abrir**.

### Paso 2: Instalar las Extensiones Recomendadas (Opcional pero muy recomendado)
Al abrir la carpeta, VS Code te sugerirá instalar las extensiones del espacio de trabajo recomendadas en `.vscode/extensions.json`. Te sugerimos darles "Instalar" para habilitar:
- **Angular Language Service** (Autocompletado inteligente y diagnósticos en plantillas Angular).
- **Tailwind CSS IntelliSense** (Autocompletado de clases estilizadas de Tailwind v4 en tiempo real).
- **ESLint** (Detección de errores y mejores prácticas al escribir TypeScript).

### Paso 3: Instalar dependencias del proyecto
Abre la terminal integrada de VS Code (`Ctrl + Ñ` o `Ctrl + \`` en Windows/Linux, `Cmd + J` en macOS) y ejecuta el siguiente comando para descargar todos los paquetes de Angular correspondientes:

```bash
npm install
```

### Paso 4: Ejecutar en el Entorno de Desarrollo Local
Para iniciar la aplicación localmente en tu ordenador y abrirla en tu navegador automáticamente:

```bash
npm run dev:local
```

Este comando:
1. Arrancará el servidor de desarrollo de Angular.
2. Escuchará en el puerto estándar **4200** (evitando colisiones con puertos de producción o contenedores).
3. Abrirá de manera automática tu explorador de internet en `http://localhost:4200`.

*Nota: Alternativamente, puedes usar `npm start` si prefieres no abrir el navegador de forma automática.*

---

## 📂 Archivos Clave del Proyecto

Por si quieres explorar o extender las funcionalidades principales de Medilink:
- 🏠 **`src/app/pages/home/home.ts`**: Página central. Contiene el listado dinámico de medicamentos recomendados, filtro de categorías, botón para añadir al carrito, resumen interactivo del carrito de compras y el modal interactivo de rastreo en tiempo real para repartos en camino.
- 👤 **`src/app/pages/profile/profile.ts`**: Gestión de perfil de usuario e historial de pedidos. Cuenta con validación estricta de formularios reactivos y un sutil toast de confirmación flotante para cambios guardados con éxito.
- 📞 **`src/app/pages/contact/contact.ts`**: Secciones de contacto rápido y ayuda mediante un acordeón dinámico de Preguntas Frecuentes interactivo guiado por `signals`.
- 🩻 **`src/app/app.html`**: Layout maestro que define el contenedor principal, el menú lateral (sidebar elegante de escritorio) y barra de navegación inferior adaptativa y ergonómica especial para dispositivos móviles.

---

## ✨ Tecnologías Utilizadas
- **Angular 21 + TypeScript** (Configurado en modo Zoneless para máxima eficiencia).
- **Tailwind CSS v4** (Para un control estético total, transiciones fluidas y adaptabilidad responsive).
- **Angular Material Icons** (Para la iconografía clara y limpia en acciones clave).
- **Motion** (Para micro-interacciones suaves y pulidas).

Disfruta de una experiencia de desarrollo limpia y libre de errores en **Visual Studio Code**. 😊
