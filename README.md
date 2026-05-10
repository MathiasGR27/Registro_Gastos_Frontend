# Frontend - Sistema de Gestión de Gastos (React + Material UI)

## Descripción del Proyecto

Este proyecto corresponde al frontend del sistema **Gestión de Gastos**, desarrollado utilizando **React**, **Vite** y **Material UI**, conectado a un backend construido bajo arquitectura **Microkernel**.

El sistema permite a los usuarios:

* Registrarse e iniciar sesión
* Gestionar gastos personales
* Visualizar estadísticas financieras
* Consultar gráficos dinámicos
* Gestionar presupuestos
* Exportar reportes PDF
* Administrar categorías
* Gestionar administradores
* Personalizar perfil y tema visual

---

# Arquitectura del Frontend

El frontend fue desarrollado utilizando una arquitectura modular basada en:

* Pages
* Components
* Context API
* Protected Routes
* Axios API Service

La aplicación funciona como una SPA (Single Page Application).

---

# Estructura del Proyecto

```bash
src/
│
├── api/
│   └── api.js
│
├── components/
│   ├── Charts.jsx
│   ├── DateFilter.jsx
│   ├── GastoForm.jsx
│   ├── GastoList.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── PresupuestoCard.jsx
│
├── context/
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   ├── ThemeContext.jsx
│   └── ThemeProviderCustom.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Gastos.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Perfil.jsx
│   ├── Categorias.jsx
│   ├── CrearAdmin.jsx
│   └── Presupuestos.jsx
│
├── routes/
│   ├── PrivateRoute.jsx
│   └── RoleRoute.jsx
│
├── App.jsx
└── main.jsx
```

---

# Tecnologías Utilizadas

## Frontend

* React
* Vite
* Material UI
* Axios
* React Router DOM
* Recharts
* DayJS

---

# Instalación del Proyecto

## Clonar el repositorio

```bash 
git clone git clone https://github.com/MathiasGR27/Registro_Gastos_Backend.git
```

---

## Ingresar al proyecto

```bash 
cd gastos-frontend
```

---

## Instalar dependencias

```bash
npm install
```

---

# Ejecutar el Proyecto

## Modo desarrollo

```bash 
npm run dev
```

La aplicación iniciará en:

```bash 
http://localhost:5173
```

---

# Conexión con el Backend

La comunicación con el backend se realiza mediante Axios utilizando el archivo:

```bash 
src/api/api.js
```

Este archivo centraliza todas las peticiones HTTP.

## Configuración de Axios

```js id="vbjlwm"
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
```

Gracias a esta configuración:

* Todas las peticiones incluyen JWT automáticamente
* El usuario permanece autenticado
* Las rutas protegidas funcionan correctamente

---

# Sistema de Temas

El proyecto implementa un sistema dinámico de temas mediante Context API.

## Funcionalidades

* Modo oscuro
* Modo claro
* Persistencia en localStorage
* Cambio dinámico de estilos

---

# Sistema de Autenticación

La autenticación se implementa mediante:

* JWT
* AuthContext
* AuthProvider
* PrivateRoute
* RoleRoute

---

# Roles del Sistema

## Administrador

Puede:

* Gestionar categorías
* Crear administradores
* Ver gastos globales
* Administrar presupuestos

---

## Usuario

Puede:

* Registrar gastos
* Editar gastos propios
* Ver estadísticas personales

---

# Dashboard Financiero

El dashboard incluye:

* Totales financieros
* Promedios
* Distribución de gastos
* Gráficos dinámicos
* Alertas de presupuesto
* Exportación PDF

---

# Sistema de Gráficos

Se implementaron gráficos utilizando Recharts:

* Pie Charts
* Bar Charts
* Estadísticas dinámicas

Los datos provienen directamente de los plugins del backend.

---

# Gestión de Gastos

## Funcionalidades

* Crear gastos
* Editar gastos
* Eliminar gastos
* Filtrar por fechas
* Historial dinámico

---

# Gestión de Categorías

Los administradores pueden:

* Crear categorías
* Editar categorías
* Eliminar categorías

---

# Sistema de Presupuestos

Cada usuario puede:

* Definir límite mensual
* Consultar alertas financieras
* Ver exceso de presupuesto

---

# Perfil de Usuario

El sistema incluye una página moderna de perfil donde el usuario puede:

* Ver información personal
* Cambiar foto de perfil
* Consultar rol
* Cerrar sesión

---

# Exportación de Reportes

Los usuarios pueden descargar reportes PDF con:

* Historial financiero
* Estadísticas
* Totales
* Gráficos

---

# 🛡️ Rutas Protegidas

## PrivateRoute

Protege rutas autenticadas.

---

## RoleRoute

Restringe acceso según rol.

---

# Características Principales

✅ Dashboard moderno
✅ Arquitectura modular
✅ Tema oscuro/claro
✅ Gestión financiera
✅ Roles y permisos
✅ Gráficos dinámicos
✅ Exportación PDF
✅ Presupuestos
✅ Alertas financieras
✅ Perfil personalizado

---

# Integración con Arquitectura Microkernel

El frontend consume un backend basado en Microkernel.

Los plugins del backend generan:

* estadísticas
* alertas
* reportes
* gráficos

El frontend simplemente visualiza dinámicamente los resultados enviados por el núcleo principal y los plugins.

---

# Autor

Grupo 5 - Gualpa Mathias y Camila Obando 
---
