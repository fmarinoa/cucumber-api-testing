# cucumber-api-testing

Proyecto de pruebas automatizadas de API usando Cucumber, Axios y Jest.

## Descripción

Este proyecto permite definir y ejecutar pruebas BDD (Behavior Driven Development) sobre APIs REST, utilizando archivos `.feature` para describir escenarios y Pactum para realizar las peticiones HTTP y validaciones.

## Buenas prácticas y escalabilidad

- Los steps están modularizados por tipo de acción.
- Los servicios HTTP se agrupan en `src/services`.
- Los datos de prueba se almacenan en `data/` y se cargan dinámicamente.
- Se recomienda usar variables de entorno para URLs y credenciales.
- Puedes agregar más servicios, steps y escenarios siguiendo la misma estructura.

## Estructura del proyecto

```
├── src/
│   ├── index.ts                # Configuración global (ej: BASE_URL)
│   └── services/
│       └── client.ts           # Cliente HTTP para construir requests
├── features/
│   ├── steps/
│   │   ├── api.steps.ts        # Steps para enviar peticiones
│   │   ├── expect.steps.ts     # Steps para validar respuestas
│   │   └── context.steps.ts    # Steps para cargar contexto desde JSON
│   ├── support/
│   │   └── index.ts            # Configuración global de Cucumber
│   └── user/
│       └── create_user.feature # Escenario de prueba de usuario
├── data/
│   └── TESTID_001.json         # Datos de entrada/salida esperados
├── cucumber.yaml               # Configuración de Cucumber
├── tsconfig.json               # Configuración de TypeScript y paths
├── package.json                # Dependencias y scripts
└── README.md                   # Documentación
```

## Principales dependencias

- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [Axios](https://github.com/axios/axios)
- [Jest](https://github.com/jestjs/jest)
- [ts-node](https://github.com/TypeStrong/ts-node)
- [tsconfig-paths](https://github.com/dividab/tsconfig-paths)
- [Prettier](https://prettier.io/) y [ESLint](https://eslint.org/) para formato y calidad de código

## Cómo ejecutar las pruebas

1. Instala las dependencias:
   ```sh
   pnpm install
   ```
2. Ejecuta las pruebas:
   ```sh
   pnpm run test
   ```

## Uso de alias de importación

El proyecto usa alias `@/` para importar desde `src/`. Configurado en `tsconfig.json` y soportado por `tsconfig-paths`.

## Ejemplo de escenario

Archivo: `features/user/create_user.feature`

```gherkin
Feature: POST /user - Create User

  @TESTID_001
  Scenario: Successfully create a new user
    Given I set the context for the test with the file "TESTID_001"
    When I send a "POST" request to "/user"
    Then the response status code should be 200
    And the response body should be the same as expected
```

## Autor

[fmarinoa](https://github.com/fmarinoa)

---

¿Dudas o sugerencias? ¡Abre un issue o contacta conmigo:)!
