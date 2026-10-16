# SALUS WEB - Gestión de versiones %OM

## Descripción

Este proyecto es una aplicación hecha con **React** para consultar y gestionar los porcentajes de %OM de distintas empresas, separados por tipo de servicio.

El ejercicio consiste en pasar a React una pantalla de referencia y conseguir que las operaciones sobre las versiones se reflejen en el listado principal.

## Funcionalidades

- Consultar las empresas y sus datos de %OM.
- Filtrar y ordenar los registros del listado.
- Cambiar de página para consultar más registros.
- Crear una nueva versión de %OM para una o varias empresas y servicios.
- Editar los porcentajes y la fecha de una versión existente sin cambiar su número.
- Eliminar todos los registros de una versión, con una confirmación previa.
- Mostrar avisos cuando una operación necesita una comprobación.

## Tecnologías utilizadas

- React
- JavaScript
- HTML y CSS
- Bootstrap
- Vite

## Cómo ejecutar el proyecto

Es necesario tener instalados **Node.js** y **npm**.

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Abrir una terminal en esa carpeta.
3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar la aplicación:

   ```bash
   npm run dev
   ```

5. Abrir en el navegador la dirección que aparece en la terminal.

Para generar una versión de producción:

```bash
npm run build
```

## Organización del proyecto

Los componentes principales son:

| Componente | Función |
| --- | --- |
| `App.jsx` | Contiene los datos principales y coordina las operaciones de la aplicación. |
| `NewVersion.jsx` | Permite introducir nuevos porcentajes y crear versiones. |
| `EditVersion.jsx` | Permite modificar los datos de una versión existente. |
| `DeleteVersion.jsx` | Permite eliminar una versión completa, mostrando antes los registros afectados. |

El proyecto también incluye la parte del listado, los filtros y la paginación.

## Cómo se gestionan los datos

Los datos de las empresas se guardan en el estado de React. Desde `App.jsx` se pasan a los componentes que necesitan consultarlos o modificarlos mediante **props**.

Para trabajar con los registros se utilizan métodos de JavaScript como `map`, `filter`, `find` y `reduce`.

Cada registro contiene información de la empresa, el servicio, el porcentaje de %OM, el número de versión y sus fechas de vigencia, entre otros datos.

**Importante:** en esta versión del proyecto no se documenta una base de datos ni una persistencia permanente. Los cambios se gestionan en el estado de la aplicación.

## Algunas decisiones tomadas

- Separar la creación, edición y eliminación de versiones en componentes diferentes.
- Mantener los datos principales en `App` para que los cambios puedan verse en el listado.
- Agrupar las empresas por tipo de servicio al trabajar con porcentajes.
- Utilizar ventanas para las operaciones de crear, editar y borrar.
- Mostrar una confirmación antes de eliminar registros.

## Limitaciones y mejoras pendientes

- La comprobación de porcentajes al editar una versión es básica y no contempla todos los casos históricos de fechas y versiones.
- Al eliminar una versión, queda pendiente revisar el recálculo de las fechas y estados de las versiones relacionadas.
- Falta realizar una comprobación completa de todas las operaciones funcionando juntas en la aplicación.
- Se podrían mejorar algunas validaciones y la organización del código en futuras versiones.

## Pruebas manuales recomendadas

Antes de entregar el proyecto, conviene comprobar:

- Que el listado muestra correctamente los registros iniciales.
- Que los filtros, la ordenación y la paginación funcionan.
- Que una nueva versión aparece en el listado.
- Que al editar una versión se mantiene su número.
- Que al borrar una versión desaparecen todos los registros de ese número.
- Que el botón Cancelar no modifica los datos.
- Que las ventanas se pueden abrir y cerrar correctamente.

## Estado del proyecto

Práctica de aprendizaje de React y JavaScript. El objetivo principal es aplicar componentes, estados, props, eventos, formularios y operaciones con arrays en una aplicación con varias funcionalidades relacionadas.
