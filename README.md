# 🇳🇮 PinolApp - Plataforma de Delivery Nicaragüense

Una plataforma de entrega de comida completa y funcional, construida con React, TypeScript, Vite, Capacitor y Supabase.

## 🎯 Características Principales

### 👥 Para Clientes
- ✅ Landing page profesional y atractiva
- ✅ Catálogo de restaurantes con menús completos
- ✅ Búsqueda y filtrado de restaurantes
- ✅ Carrito de compras persistente
- ✅ Múltiples métodos de pago (Efectivo, Tarjeta, Transferencia)
- ✅ Seguimiento en tiempo real de pedidos
- ✅ Chat en vivo con conductor
- ✅ Mapa interactivo de ubicación del driver
- ✅ Historial de pedidos
- ✅ Perfil de usuario con direcciones guardadas

### 🚗 Para Drivers (Conductores)
- ✅ Registro y verificación de identidad
- ✅ Dashboard de entregas disponibles
- ✅ Mapa en tiempo real
- ✅ Aceptar/rechazar pedidos
- ✅ Sistema de ganancias transparente (80% comisión)
- ✅ Estadísticas de entregas y calificaciones
- ✅ Múltiples opciones de retiro (banco o efectivo)

### 🏪 Para Restaurantes
- ✅ Gestión de menú y productos
- ✅ Dashboard de pedidos en vivo
- ✅ Sistema de notificaciones

## 🚀 Stack Tecnológico

```
Frontend:
  - React 19.2 con TypeScript
  - Vite 8.0 (build tool)
  - Tailwind CSS 4.2 (styling)
  - React Router DOM 7.14 (routing)
  - Zustand 5.0 (state management)
  - React Hot Toast 2.6 (notifications)
  - Lucide React 1.7 (icons)

Mobile:
  - Capacitor 8.3 (cross-platform)
  - Android Build Tools

Backend/Database:
  - Supabase (PostgreSQL + Auth)
  - Node.js (CLI tools)

DevOps:
  - GitHub Actions (CI/CD)
  - Gradle (Android builds)
```

## 📦 Instalación

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/valenitapinol/pinolofficalnic.git
cd pinolofficalnic
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Edita el archivo .env con tus credenciales de Supabase
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
# Accede a http://localhost:5173
```

5. **Construir para producción**
```bash
npm run build
```

## 🌐 Despliegue en Vercel

### Pasos para Deployment

1. **Conectar repositorio en Vercel**
   - Ve a https://vercel.com
   - Conecta tu cuenta de GitHub
   - Selecciona este repositorio

2. **Configurar variables de entorno en Vercel**
   - Accede a Settings > Environment Variables
   - Agrega:
     ```
     VITE_SUPABASE_URL=tu_url_de_supabase
     VITE_SUPABASE_ANON_KEY=tu_clave_anonima
     ```

3. **Desplegar**
   - Vercel lo hace automáticamente en cada push a main
   - URL: `tu-proyecto.vercel.app`

## 📱 Estructura del Proyecto

```
src/
├── pages/
│   ├── Landing.tsx          # Página de inicio / marketing
│   ├── Home.tsx             # Home del cliente con restaurantes
│   ├── Login.tsx            # Autenticación
│   ├── Register.tsx         # Registro de clientes
│   ├── Cart.tsx             # Carrito de compras
│   ├── Checkout.tsx         # Confirmación del pedido
│   ├── Payment.tsx          # Procesamiento de pagos
│   ├── Orders.tsx           # Historial de pedidos
│   ├── Profile.tsx          # Perfil del usuario
│   ├── RestaurantDetail.tsx # Detalles del restaurante
│   ├── Tracking.tsx         # Rastreo en vivo
│   ├── DriverRegister.tsx   # Registro de drivers
│   └── DriverDashboard.tsx  # Dashboard del driver
├── components/
│   ├── Header.tsx           # Encabezado con logo
│   ├── CartIcon.tsx         # Ícono del carrito
│   ├── RestaurantCard.tsx   # Tarjeta de restaurante
│   ├── MenuItem.tsx         # Elemento de menú
│   ├── DriverMap.tsx        # Mapa del driver
│   ├── ChatBox.tsx          # Chat en vivo
│   └── ProtectedRoute.tsx   # Rutas protegidas
├── store/
│   └── useStore.ts          # Estado global (Zustand)
├── lib/
│   └── supabase.ts          # Cliente de Supabase
├── types/
│   └── index.ts             # Tipos TypeScript
├── App.tsx                  # Rutas principales
└── main.tsx                 # Punto de entrada
```

## 💳 Sistema de Pagos

### Métodos Soportados

1. **Efectivo**
   - Sin comisión
   - Pago al recibir

2. **Tarjetas Bancarias**
   - BAC Credomatic
   - Banpro
   - Banco Avanza
   - Comisión: C$ 50

3. **Transferencia Bancaria**
   - Transferencia directa
   - Confirmación manual
   - Comisión: C$ 50

## 🔐 Autenticación con Supabase

### Configuración Inicial

1. Crear cuenta en https://supabase.com
2. Crear nuevo proyecto
3. Copiar credenciales:
   - Project URL
   - Anon/Public Key

4. Configurar las tablas necesarias:

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de restaurantes
CREATE TABLE restaurants (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  rating DECIMAL(3,1),
  time INTEGER,
  price INTEGER,
  address TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT REFERENCES restaurants(id),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  restaurant_id BIGINT REFERENCES restaurants(id),
  status TEXT DEFAULT 'pending',
  total INTEGER NOT NULL,
  delivery_address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de items del pedido
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id),
  product_id BIGINT REFERENCES products(id),
  quantity INTEGER,
  price INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de drivers
CREATE TABLE drivers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  vehicle_type TEXT,
  plate TEXT,
  bank_account TEXT,
  status TEXT DEFAULT 'pending_approval',
  rating DECIMAL(3,1) DEFAULT 5,
  total_deliveries INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚕 Flujo de Driver

1. **Registro**: El driver se registra con información personal y del vehículo
2. **Verificación**: Nuestro equipo verifica los documentos (24h)
3. **Activación**: El driver puede comenzar a aceptar entregas
4. **Entregas**: Acepta pedidos, recoge en restaurante, entrega al cliente
5. **Ganancias**: 80% de cada entrega, retiro semanal automático

## 👥 Flujo de Cliente

1. **Landing**: Visita la página de inicio
2. **Registro/Login**: Crea cuenta o inicia sesión
3. **Explorar**: Navega restaurantes y productos
4. **Carrito**: Agrega items al carrito
5. **Checkout**: Confirma dirección y notas
6. **Pago**: Elige método de pago
7. **Rastreo**: Sigue tu pedido en tiempo real
8. **Entrega**: Recibe tu pedido con chat en vivo

## 🔗 URLs Principales

```
Landing:      /
App Cliente:  /app
Login:        /login
Registro:     /register
Carrito:      /cart
Checkout:     /checkout
Pago:         /payment
Pedidos:      /orders
Perfil:       /profile
Rastreo:      /tracking/:id

Driver Registro: /driver/register
Driver Dashboard: /driver/dashboard
```

## 📊 Variables de Entorno

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
VITE_APP_NAME=PinolApp
```

## 🛠️ Compilar APK Mobile

```bash
# Sincronizar código con Capacitor
npm run build
npx capacitor copy

# Compilar APK
cd android
./gradlew assembleRelease

# APK está en: android/app/build/outputs/apk/
```

## 📝 Características de Datos Mock

La aplicación incluye datos mock locales de los mejores restaurantes nicaragüenses:
- El Patio - Comida Típica
- Pupusas Express
- Pizza Italiana
- Pollo con Tajadas
- Anafre - Mariscos
- Hamburguesas USA

**Nota**: La app funciona perfectamente sin Supabase usando datos locales.

## 🐛 Solución de Problemas

### "App aparece en blanco"
- Verifica que VITE_SUPABASE_URL esté correctamente configurado
- La app debería funcionar con datos mock si no hay conexión

### "Error al hacer Build"
```bash
npm install
npm run build
```

### "Puerto 5173 en uso"
```bash
npm run dev -- --port 3000
```

## 📄 Licencia

Este proyecto es de uso privado. Contacta a valenitapinol@gmail.com para licencias comerciales.

## 👨‍💻 Autor

Desarrollado por Valentina Piñol

## 📞 Soporte

- Email: valenitapinol@gmail.com
- GitHub Issues: https://github.com/valenitapinol/pinolofficalnic/issues

---

**¡Hecho con ❤️ para Nicaragua!** 🇳🇮
