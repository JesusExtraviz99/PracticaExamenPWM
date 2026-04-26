# CRUD Angular + Firebase

Aplicación web desarrollada con Angular y Firebase que implementa un sistema CRUD completo con relaciones entre entidades.

## Funcionalidades

* Gestión de estudiantes (Students)
* Gestión de asignaturas (Subjects)
* Gestión de calificaciones (Grades)
* Relación entre entidades mediante IDs
* Autenticación básica con Firebase (Login)

## Tecnologías usadas

* Angular
* Firebase (Firestore + Auth)
* AngularFire

## Ejecución del proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar el servidor:

```bash
ng serve
```

3. Abrir en el navegador:

```txt
http://localhost:4200/
```

## Estructura principal

```txt
pages/
  ├── login/
  ├── students/
  ├── subjects/
  └── grades/

services/
  ├── firestore.service.ts
  └── auth.service.ts
```

## Descripción del funcionamiento

* **Students**: CRUD de estudiantes (nombre, email)
* **Subjects**: CRUD de asignaturas (nombre, descripción)
* **Grades**: Relaciona estudiantes y asignaturas mediante sus IDs y almacena una nota

Las relaciones se resuelven en el frontend mostrando los nombres en lugar de los IDs.

## Firebase

La aplicación utiliza Firebase para:

* Almacenamiento de datos (Firestore)
* Autenticación de usuarios
