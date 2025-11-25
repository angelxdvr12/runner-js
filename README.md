# 🎮 RunnerJS Game

Un videojuego tipo "Endless Runner" desarrollado como Proyecto Integrador Full Stack. Combina lógica de renderizado en tiempo real con HTML5 Canvas y persistencia de datos mediante una API REST en Node.js.

## Descripción

RunnerJS desafía al jugador a esquivar obstáculos que aumentan de velocidad progresivamente. El objetivo principal fue crear una experiencia fluida en el frontend que se comunica con un backend para almacenar y clasificar las mejores puntuaciones en una tabla de líderes global.

### Características Principales
* 🏃 **Mecánica Endless Runner:** Juego infinito con detección de colisiones precisa (AABB) y física de gravedad simulada.
* 📱 **Soporte Móvil:** Jugabilidad adaptada para dispositivos táctiles (celulares y tablets).
* 📈 **Dificultad Progresiva:** La velocidad de los obstáculos y el nivel aumentan automáticamente cada 500 puntos.
* 🏆 **Leaderboard Global:** Sistema de ranking conectado a una API que almacena los mejores puntajes (Top 10).
* 💾 **Persistencia de Datos:** Backend personalizado que gestiona la lectura y escritura de puntajes en formato JSON.
* 🎨 **Interfaz Reactiva:** Diseño moderno con HTML5 y CSS3, incluyendo pantallas de "Game Over" y transiciones suaves.

## 🛠️ Stack Tecnológico

| Componente       | Tecnología                                    |
| :--------------  | :-------------------------------------------  |
| **Frontend**     | HTML5 Canvas, CSS3, JavaScript (Vanilla ES6+) |
| **Backend**      | Node.js, Express.js                           |
| **Persistencia** | JSON File System (fs), REST API               |
| **Despliegue**   | GitHub Pages (Front) + Render (Back)          |

## 📋 Requisitos Previos

Para ejecutar este proyecto localmente necesitas:
* [Node.js](https://nodejs.org/) (Versión 14 o superior).
* [Git](https://git-scm.com/).

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu computadora:

### 1. Clonar el repositorio
Descarga el código fuente a tu máquina:
```bash
git clone [https://github.com/angelxdvr12/runner-js.git](https://github.com/angelxdvr12/runner-js.git)
cd runner-js
```

### 2.Configurar y Levantar el Backend (API)
El juego necesita que el servidor esté encendido para guardar las puntuaciones.

```bash
cd backend
npm install   # Instala Express y CORS
node server.js
Nota: Deberías ver el mensaje: Servidor corriendo en http://localhost:3000
```

### 3. Ejecutar el Frontend (Juego)
Abre una nueva terminal (no cierres la del backend) y navega a la carpeta frontend.
Puedes simplemente abrir el archivo index.html en tu navegador, o si usas VS Code, usar la extensión "Live Server".
Importante: Para que el juego funcione en modo local (en tu PC), asegúrate de que en el archivo frontend/proyecto/api.js la URL apunte a tu servidor local:

```JavaScript
// En modo local usa esta línea:
const API_URL = 'http://localhost:3000/api/scores';
```

🎮 Controles
El juego es compatible con PC y Dispositivos Móviles:
Teclado: ESPACIO, flecha Arriba (↑) o haciendole click para saltar.
Celular / Tablet: Toque en pantalla (Tap) para saltar.
Mouse: Navegar por la interfaz y Clic izquierdo para saltar.

🌐 Ver Demo Online
Puedes probar el proyecto desplegado aquí:
Juego: https://angelxdvr12.github.io/runner-js/
Repositorio: https://github.com/angelxdvr12/runner-js.git

Desarrollado por Angel Vicente Vargas Ruiz - Proyecto Integrador
