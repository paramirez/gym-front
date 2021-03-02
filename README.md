# GYM FRONT

Proyecto frontend ue sirve de FrontEnd para el protecto [GYM API](https://github.com/paramirez/gym-api)

## Requisitos

- Instalar el CLI de angular [Angular CLI](https://github.com/angular/angular-cli)
- Contar con el backend [GYM API](https://github.com/paramirez/gym-api) desplegado

## Development server

Se requiere agregar la variable de entorno `apiUrl=http://example:2500` que debe apuntar al despliegue backend del proyecto [GYM API](https://github.com/paramirez/gym-api), esto en `src/environments/*.ts`

#### Puesta en marcha

```bash

$ npm i

# Desarrollo
$ npm start

# producción
$ ng build

```
