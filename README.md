# Backend nest

Backend nestjs para prueba tecnica

## Tabla de Contenidos

- [Library Versions](#setup)
- [Setup](#setup)
- [Usage](#usage)

## Library Versions

- **Nestjs**: `^10.2.0`
- **Typescript**: `5.1.3`
- **Nestjs/jwt**: `^10.2.27`
- **Prisma**: `^6.1.0`

## Setup

Previamente para poder realizar las pruebas en entorno de desarrollo correspondientes se necesita crear un archivo `.env` para poder usar la aplicacion dejo los valores que se necesitan

```env
POSTGRES_DBNAME=<DB_NAME>
POSTGRES_USER=<DB_USER>
POSTGRES_PASSWORD=<DB_PASSWORD>
POSTGRES_PORT=<DB_PORT>

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DBNAME}
JWT_SECRET=<JWT_SECRET>

```

Para Instalar:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run start:dev

# pnpm
pnpm run start:dev

# yarn
yarn start:dev

# bun
bun run start:dev
```

## Production

Build the application for production:

```bash
# npm
npm run start:prod

# pnpm
pnpm run start:prod

# yarn
yarn start:prod

# bun
bun run start:prod
```

## Usage

Despues de creado el archivo `.env` con las respectivas variable y haber instalado las depencias correspondientes, ejecutas en folder correspondiente el comando docker compose up -d para ejecutar el archivo`docker-compose.yml` para configurar la base de datos en Postgres y poder ejecutar lo cambios correspondiente, siguiente a eso vamos a ejecutar el comando `npm run migrate` una configuracion que ejecuta con Prisma la creacion de tablas y lo necesario para interactuar con las base de datos.

Por consiguiente sin registro alguno de usuario se ha creado un endpoint `/auth/signup` que se puede usar para registrar el usuario usando postman.

```json
{
  "email": "ejemplo@email.com",
  "password": "pass"
}
```

Para visualizar los datos o interactuar con GUI puede ejecutar el command `npx prisma studio` abrira un pagina en el sitio https://localhost:5555 para interatuar con los schemas y registrar datos.

Realizado esto se procede a iniciar sesion desde el endpoint `/auth/login` con los mismos datos registrados y el cual devolvera un jwt token para usar en la aplicacion, se debe agregar en la cabecera de las peticions `Authorization: Bearer <token>`.

Ya lo demas servicios retornaran resultados o indicaran que no esta autorizado.

## Pending

Lista de pendiente que no se pudieron resolver durante el desarrollo de la prueba

- [ ] Agregar Image en el storage del servidor
- [ ] Logica para enviroment de producion y desarrollo
