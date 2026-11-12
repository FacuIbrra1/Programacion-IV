# Potrero Libre — Plan de sprints

**Trabajo Práctico Nº 2 — Programación IV — Red social**
**Autor:** Facundo Ibarra
**Idea:** red social de fútbol amateur. Jugadores sin club, directores técnicos y clubes
(con su propio perfil de institución) se encuentran, publican y se siguen.

**Stack:** Angular 22 (front) · NestJS 12 (back) · MongoDB Atlas · JWT · Cloudinary · deploy en Vercel.

---

## Regla: solo temas vistos en clase

**Está prohibido usar lógica o conceptos que no se hayan visto en clase.** La referencia es
el repositorio Programacion-IV (ejemplos de clase, ejercicios y Resúmenes de Angular y NestJS).
Si algo hace falta sí o sí y no se vio, se anota acá y se decide antes de usarlo.

### Conceptos no vistos que el enunciado exige (decididos el 27/10)

| # | Concepto | Para qué lo pide el TP | Sprint | Decisión |
|---|---|---|---|---|
| 1 | Validar que `tipo` sea jugador, dt o club | Responder 400 y no 500 ante un tipo inválido | 1 | ✅ **`@IsIn`** en el DTO |
| 2 | Contraseña con al menos una mayúscula y un número | "8 caracteres, una mayúscula y un número" | 1 | ✅ **Expresión regular** (`@Matches`) en el DTO |
| 3 | Validar que la fecha de nacimiento sea una fecha real | Responder 400 y no 500 | 1 | ✅ **`@IsDateString`** en el DTO |
| 4 | Encriptar la contraseña (en clase solo se mencionó en un comentario) | "La contraseña debe quedar encriptada" | 1 | ✅ **bcrypt** |
| 5 | Recibir un archivo | Imagen de perfil en el registro | 1 | ✅ **`multipart/form-data` + `FileInterceptor`** (los interceptores se vieron el 27/10) |
| 6 | Guardar la imagen | "Guardarla apropiadamente y guardar la URL" | 1 | ✅ **Cloudinary** (visto en clase el 27/10) |
| 7 | Responder 409 ante un correo o usuario repetido | Status correctos: sin esto, un repetido responde 500 | 1 | ✅ **Opción A**: `findOne` antes de crear + `ConflictException` |
| 8 | CORS | Que el navegador deje al front de Angular llamar al back | 1 | ✅ **`app.enableCors()`** sin opciones: la forma más sencilla |

**Opciones para el punto 7** (se eligió la A):

- **A — Buscar antes de crear (elegida):** `findOne({ email })` y `findOne({ username })` en el
  servicio y, si existe, `throw new ConflictException('...')`. Casi todo es visto: el `findOne`
  por correo está en el login del ejemplo de cookies, lanzar una excepción está en su guard
  (`UnauthorizedException`) y el status 409 (`HttpStatus.CONFLICT`) apareció en `nest1`. Además
  permite decir cuál de los dos campos está repetido.
- **B — Atrapar el error de Mongo:** `try/catch` alrededor del `create` y, si `error.code === 11000`,
  lanzar el 409. El `try/catch` se vio en el guard, pero el código `11000` no.

En los dos casos el `unique` del schema se queda: es la última barrera si dos registros llegan
al mismo tiempo.

### Temas vistos en la clase del 27/10

| Tema | Dónde se usa en el TP | Ejemplo del profe |
|---|---|---|
| Conexión con **Cloudinary** en un proyecto de Nest | Imagen de perfil (Sprint 1) e imagen de las publicaciones (Sprint 2) | ✅ `Ejemplos en Clase/cloudinary` |
| **Interceptor** (el equivalente al *middleware* de Node) | `FileInterceptor` para recibir la imagen | ✅ El mismo ejemplo de Cloudinary |
| **Deploy en Vercel** (reemplaza a Firebase) | Front y back del TP-2 | — |

**Cómo se aplicó el ejemplo de Cloudinary** (`backend/src/cloudinary/cloudinary.service.ts`): igual
que el del profe, `upload_stream` envuelto en una `Promise`, `FileInterceptor` con `memoryStorage()`
y `resource_type: 'image'`. Hay tres diferencias, a propósito:

| En el ejemplo | En el TP | Por qué |
|---|---|---|
| `cloudinary.config(...)` arriba del archivo | Dentro del constructor del servicio | Arriba del archivo se ejecuta antes de que se cargue el `.env`: las claves llegarían vacías |
| `public_id` = nombre del archivo | Sin `public_id` (Cloudinary pone un nombre único) | Dos usuarios que suban `foto.jpg` se pisarían la imagen |
| Se sube en el controller, antes de todo | Se sube en el servicio, después de validar | Un registro que termina en 400 o 409 no deja una imagen suelta en Cloudinary |

### Temas vistos en la clase del 29/10

| Tema | Dónde se usa en el TP | Ejemplo del profe |
|---|---|---|
| **Interceptores en Angular**: agregar el encabezado de autenticación a los pedidos que van al back | Sprint 2: el token en `Authorization: Bearer` | ⏳ Si está, subirlo a Programacion-IV |
| **Interceptores en Angular**: reintentar pedidos fallidos con retroceso exponencial | Sprint 2: solo los `GET` y pocas veces (algo sencillo) | ⏳ Si está, subirlo a Programacion-IV |
| **Interceptores en Nest** | Solo `FileInterceptor`: no hace falta otro | — |

---

## Calendario

Las clases son los **martes y jueves**, y en cada una se puede presentar el avance al
profesor. Cada sprint termina el día de una clase, así se presenta apenas está hecho.

| Fecha | Día | Qué pasa |
|---|---|---|
| 26/10 | lunes | Sprint 0: decisiones, cuentas y proyectos creados |
| **27/10** | martes | **Clase — presentación del Sprint 0** (idea, plan y decisiones) y consultas |
| 27/10 → 04/11 | mar → mié | **Sprint 1** — registro, login y base de los dos proyectos ✅ terminado y publicado en Vercel |
| 29/10 | jueves | Clase — interceptores en Angular y Nest (el Sprint 1 no llegó a presentarse) |
| 30/10 → 08/11 | vie → dom | **Sprint 2** — publicaciones y me gusta (el back quedó listo el 04/11; el front, del 06/11 al 08/11) |
| 03/11 | martes | Sin clase |
| **05/11** | jueves | **Clase — presentación del Sprint 1** |
| 09/11 → 12/11 | lun → jue | **Sprint 3** — comentarios y sesión con JWT de 15 minutos ✅ terminado y en entrega |
| **10/11** | martes | **Clase — presentación del Sprint 2** (al final hubo clase) ✅ presentado, con 3 correcciones |
| **12/11** | jueves | **Clase — presentación del Sprint 3** |
| 13/11 → 17/11 | vie → mar | **Sprint 4** — administrador, estadísticas, PWA, pipes y directivas |
| **17/11** | martes | **Clase — presentación del Sprint 4 · Finalización** |
| 18/11 | miércoles | Colchón: pruebas en la URL pública, README y preparación de la defensa |
| **19/11** | jueves | **Clase — Entrega y defensa oral** |

**Cronograma (actualizado el 11/11).** No hubo clase el 03/11. El 05/11 se presentó el Sprint 1.
El 10/11 al final hubo clase y se presentó el Sprint 2; el Sprint 3 se presenta el 12/11, el
Sprint 4 el 17/11, y la entrega y la defensa oral son el 19/11.

**Cómo quedan los tiempos:** el Sprint 2 solo necesita el front, porque su back ya está. El
Sprint 3 queda con 4 días (con el feriado), así que su back (comentarios, `autorizar` y refrescar
el token) puede empezar apenas termine el front del Sprint 2. El Sprint 4, el más pesado, tiene
5 días: conviene adelantar lo que se pueda (por ejemplo, el back del administrador) y dejar el
18/11 para pruebas y la defensa.

### Consultas a la cátedra (27/10)

| # | Consulta | Respuesta | Estado |
|---|---|---|---|
| 1 | El enunciado dice **"2026 C1"**: ¿es la versión vigente? | Sí | ✅ Confirmado |
| 2 | ¿El 19/11 se entregan los **Sprints 1 a 4**? | Sí, hasta el Sprint 4 | ✅ Confirmado |
| 3 | ¿La **cuenta de un club la maneja su delegado**, con el registro de una persona? | Se cambió el 04/11: la cuenta es el perfil de la institución (ver decisión 2) | ✅ Decidido · contárselo al profe |
| 4 | Mi Perfil (Sprint 2) muestra comentarios cuyo controller es del **Sprint 3**: ¿se aceptan recién en el 3? | Sin respuesta todavía | ⏳ Por definirse |
| 5 | ¿Alcanza con el token en la respuesta y en el header, sin cookies? | Las cookies no son obligatorias | ⏳ Por definirse |

Mientras estén "por definirse", se sigue con lo planificado: token en el header, y el modelo
de comentarios creado en el Sprint 2 para poder mostrarlos en Mi Perfil apenas existan.

Los **Sprints 5 (recuperatorio) y 6 (final)** quedan fuera de esta entrega (confirmado por la
cátedra: el 19/11 se entrega hasta el Sprint 4). Igual se tienen
en cuenta desde el diseño: las colecciones que necesitan sus estadísticas (`ingresos`,
`visitas`, `likes` con fecha) se crean antes, para que cuando lleguen haya datos.

---

## Decisiones tomadas

| # | Decisión | Por qué |
|---|---|---|
| 1 | Dos atributos distintos: **`perfil`** (`usuario` \| `administrador`) y **`tipo`** (`jugador` \| `dt` \| `club`) | El enunciado usa "perfil" para el rol; el tipo de cuenta futbolero es otra cosa |
| 2 | **Una cuenta Club es el perfil de la institución** (04/11): la maneja quien sea, como la cuenta de Instagram de un club. En el registro pide *nombre de la institución* (se guarda en `nombre`, sin apellido) y *fecha de creación* (se guarda en `fechaNacimiento`) | Con la cuenta a cargo de un delegado, el perfil mostraba a una persona en lugar del club. ⚠️ El enunciado pide apellido y fecha de nacimiento en el registro: se cumple para jugador y DT; para el club, contárselo al profe como decisión de diseño |
| 3 | Token en el header **`Authorization: Bearer`** + interceptor en Angular ⏳ *por definirse con la cátedra* | Front y back en dominios distintos: una cookie sería de terceros y los navegadores la bloquean |
| 4 | **JWT desde el Sprint 1**, aunque el enunciado lo pida en el 3 | En el Sprint 2 hay que saber quién da me gusta y quién borra |
| 5 | Imágenes en **Cloudinary** | Se vio en clase el 27/10, y el back en Vercel no tiene un disco propio donde guardar archivos |
| 6 | `likes`, `comentarios`, `guardados` y `compartidos` en **colecciones propias**, con índice único donde corresponda | La base garantiza "un solo me gusta"; la fecha de cada uno alimenta las estadísticas del Sprint 5 |
| 7 | **Login por correo** (único). El nombre de usuario también es único | Lo exige el enunciado para el campo que se use en el login |
| 8 | Repo nuevo para el TP-2 con `backend/` y `frontend/` | Igual que el TP-1: cada proyecto con su deploy |
| 9 | **Nada de `alert()` ni `confirm()`**: siempre modales | Lo prohíbe el enunciado (ojo: el `formGuard` del TP-1 usaba `confirm()`) |
| 10 | **Todas las pantallas requieren sesión** (salvo login y registro) | "Solo se puede acceder a la aplicación estando registrado o logueado" |
| 11 | **Deploy en Vercel**, front y back (no Firebase) | Lo indicó la cátedra en la clase del 27/10 |

---

## Modelo de datos (primera versión)

| Colección | Campos | Sprint |
|---|---|---|
| `usuarios` | nombre, apellido, **email** (único), **username** (único), passwordHash, fechaNacimiento, descripcion, imagenUrl, `perfil`, `tipo`, `activo`, creadoEn | 1 |
| `publicaciones` | titulo, mensaje, imagenUrl?, autor → usuarios, categoria, `activa`, cantidadLikes, creadaEn | 2 |
| `likes` | publicacion, usuario, fecha · **único `(publicacion, usuario)`** | 2 |
| `comentarios` | publicacion, autor, mensaje, `modificado`, creadoEn | 2 (modelo) / 3 (endpoints) |
| `ingresos` | usuario, fecha | 3 (se empieza a registrar) |
| `visitas` | visitante, visitado, fecha | 5 |
| `guardados` / `compartidos` | usuario, publicacion · de, para, publicacion, fecha | 6 |

---

## Sprint 0 — Cimientos · 26/10 · se presenta el mar 27/10

**Objetivo:** que el Sprint 1 arranque escribiendo código, no creando cuentas.

- [x] Repo nuevo en GitHub con `backend/` y `frontend/`: [TP2-FacundoIbarraQuiroz](https://github.com/FacuIbrra1/TP2-FacundoIbarraQuiroz)
- [x] `nest new backend` (NestJS 12, ESM, igual que `ejercicio-1`)
- [x] `ng new frontend` (Angular 22, standalone, igual que el TP-1)
- [x] Base `potrero-libre` en el cluster de Atlas y `MONGO_URI` en el `.env` (que no se sube)
- [x] Cuenta de Cloudinary creada
- [ ] Las tres claves de Cloudinary en el `.env` → **pasa al Sprint 1** (el tema se vio el 27/10)
- [x] Proyecto en **Vercel** (antes Firebase Hosting) → hecho al final del Sprint 1: front y back publicados
- [x] Logo de "Potrero Libre"
- [x] Identidad visual: paleta tomada del logo (ver la sección siguiente)
- [x] Favicon propio: la marca "PL" sin el texto, en `identidad-visual/`

---

## Identidad visual

Sale del logo (`identidad-visual/logo-original.webp`). Los colores se midieron sobre los
píxeles de la imagen, no a ojo.

| Token | Color | Uso |
|---|---|---|
| `--fondo` | `#061420` | Fondo de la aplicación (el azul noche del logo) |
| `--superficie` | `#0d2131` | Tarjetas, publicaciones, modales |
| `--superficie-alta` | `#15304a` | Bordes, separadores, elementos encima de una tarjeta |
| `--verde` | `#3dda45` | Color principal: botones, me gusta, enlaces, foco |
| `--azul` | `#05aff9` | Color secundario: acciones de información, etiquetas |
| `--texto` | `#f2f5f8` | Texto principal |
| `--texto-suave` | `#9db2c7` | Fechas, ayudas, texto secundario |
| `--error` | `#ff6b6b` | Errores de formulario y mensajes de rechazo |
| `--aviso` | `#ffc940` | Avisos (por ejemplo, el modal de "quedan 5 minutos") |

**Contrastes medidos (WCAG):** todos los textos dan AA o más. Texto sobre fondo: 17:1;
verde sobre fondo: 10:1; azul sobre tarjeta: 6,7:1; texto suave sobre tarjeta: 7,5:1.

**Regla importante:** el **texto blanco sobre verde no se lee** (1,9:1). Los botones verdes
llevan el texto en `--fondo` (10:1).

**Archivos** (en `identidad-visual/`, para copiar a `frontend/public/`):

| Archivo | Para qué |
|---|---|
| `favicon.ico` | Favicon de la pestaña (16, 32 y 48 px). Solo la marca: el texto "POTRERO LIBRE" no se lee a ese tamaño |
| `apple-touch-icon.png` | Ícono de 180 px para cuando se agrega a la pantalla de inicio en iPhone |
| `icono-512.png` | Base para los íconos de la PWA del Sprint 4 |
| `logo-potrero-libre.png` | Logo completo (600 px) para las pantallas de login y registro |

---

## Sprint 1 — Registro y login · 27/10 → 04/11 · se presenta el jue 05/11

**Objetivo:** un usuario se registra con su foto, inicia sesión y navega las cuatro pantallas.

### Back
- [x] Módulos `usuarios`, `autenticacion` y `publicaciones` (este último puede quedar vacío)
- [x] Schema `Usuario` con `perfil` (por defecto `usuario`), `tipo` y `activo`
- [x] `ValidationPipe` global con `whitelist`, `forbidNonWhitelisted` y `transform`
- [x] CORS con `app.enableCors()`
- [x] **`POST /auth/registro`** (`multipart/form-data`):
  - [x] DTO con todas las validaciones: `@IsIn` para el tipo, `@Matches` para la contraseña
        (8 caracteres, una mayúscula y un número) y `@IsDateString` para la fecha
  - [x] Contraseña encriptada con **bcrypt**
  - [x] Imagen recibida con `FileInterceptor` (obligatoria, solo imágenes, hasta 2 MB → 413)
        y subida a **Cloudinary**; se guarda la URL. ⏳ Revisar contra el ejemplo del profe
  - [x] Email o username repetido → **409** (`findOne` antes de crear + `ConflictException`)
  - [x] Respuesta **201** con el usuario **sin** la contraseña y con el token
- [x] **`POST /auth/login`**:
  - [x] Credenciales incorrectas → **401** (mismo mensaje para correo y contraseña)
  - [x] Respuesta **200** con todos los datos del usuario (sin contraseña) y el token
- [x] `JwtModule` en `AppModule` (`global: true`), con el secreto leído del `.env`; el token dura 15 minutos
- [x] Primer deploy del back en **Vercel**: `https://potrero-libre-back.vercel.app` (04/11)

### Front
- [x] Pantallas: **Registro**, **Login**, **Publicaciones** y **Mi Perfil** (las dos últimas,
      con el contenido del Sprint 2 marcado como "próximamente")
- [x] Navegación entre pantallas, sin restricciones de acceso todavía
- [x] **Login:** formulario con validaciones y mensajes
- [x] **Registro:** nombre, apellido, correo, nombre de usuario, contraseña, repetir contraseña,
      fecha de nacimiento, descripción breve, imagen de perfil (campo file) y **tipo de cuenta**
- [x] Validador propio de contraseña y validación cruzada de "repetir contraseña"
- [x] Favicon propio (`favicon.ico` de `identidad-visual/`) y paleta como tokens en `:root`
- [x] Los errores del servidor se muestran en la pantalla (nunca con `alert()`)
- [x] Deploy del front en **Vercel**: `https://potrero-libre.vercel.app` (04/11), conectado al back publicado

**El código completo del Sprint 1** está en `backend/` y `frontend/`, dentro de esta misma
carpeta, para copiarlo al repo del TP.

### Conceptos nuevos que usa el Sprint 1 (a revisar)

Además de los 8 decididos el 27/10, el código usa estas piezas que no aparecen tal cual en los
ejemplos de clase:

| Dónde | Qué | Por qué |
|---|---|---|
| Back | `JwtModule.register` en `AppModule` y no en `AutenticacionModule` | Ese archivo se carga antes que el `.env`: el secreto llegaría vacío |
| Back | `"express"` y `"multer"` en `types` del `tsconfig.json` | Para que TypeScript reconozca `Express.Multer.File` |
| Back | `@HttpCode(200)` en el login | Se vio con `@HttpCode(204)`; un POST responde 201 por defecto |
| Back | `BadRequestException` | Igual que `UnauthorizedException` y `ConflictException`, con 400 |
| Front | `FormData` | La forma de mandar `multipart/form-data` desde el navegador |
| Front | `(change)` en el campo file y `input.files` | El campo file no funciona con `formControlName` |
| Front | Validador a nivel formulario (`{ validators: passwordsIguales }`) | La validación cruzada compara dos campos |
| Front | `markAllAsTouched()` | Muestra todos los mensajes al tocar "Ingresar" o "Crear cuenta" con el formulario incompleto |
| Back (deploy) | `void bootstrap();` al final del `main.ts` (en vez de `await bootstrap();`) | Vercel atrapa `app.listen()` y no lo termina: con `await`, el `main.ts` nunca termina de cargar y el back cae al minuto (`INTERNAL_FUNCTION_INVOCATION_FAILED`). Es lo mismo que el ejemplo de Cloudinary del profe |
| Back (deploy) | `MongooseModule.forRoot(uri, { lazyConnection: true })` | Vercel espera solo 1 segundo a que se llame a `app.listen()`; así Nest no espera a Atlas para arrancar y se conecta en segundo plano |
| Front (deploy) | `API_URL` según `window.location.hostname` | En la compu usa el back local; publicado, el de Vercel |

### Para decidir más adelante

- **URL del back en el front** (`frontend/src/app/api.ts`): hoy es `http://localhost:3000`; al hacer
  el deploy, va la del back en Vercel.
- **Espacios al principio o al final desde Postman:** el front los recorta, pero un
  `username` como `" lioperez"` mandado a mano esquiva el 409 y termina en un 500.
- **Fecha de nacimiento futura:** hoy se acepta.
- **Usuario deshabilitado en el login:** es del Sprint 4.

**Nuevo en este sprint:** bcrypt, subida de archivos con `FileInterceptor`, Cloudinary, y
validar un `multipart` (todos los campos llegan como texto: la fecha se valida con
`@IsDateString` y Mongoose la convierte a `Date` al guardar).

**Definición de hecho:** registrarse con foto desde la URL pública, ver la foto guardada en
Cloudinary y la contraseña encriptada en Atlas, e iniciar sesión con esa cuenta.

---

## Sprint 2 — Publicaciones y me gusta · 30/10 → 08/11 · presentado el mar 10/11

**Objetivo:** publicar, listar, ordenar, paginar y dar me gusta.

### Pasos

| Paso | Qué | Dónde |
|---|---|---|
| 0 | Poner al día el repo de entrega (Cloudinary, CORS, publicaciones, `vercel.json`) y cambiar las claves expuestas | — |
| 1 | `AuthGuard` con el token del header + ruta de prueba `GET /auth/perfil` | Back |
| 2 | Schemas `Publicacion`, `Like` y `Comentario` | Back |
| 3 | `POST /publicaciones` (imagen opcional) | Back |
| 4 | `GET /publicaciones` (orden, filtros y paginado) | Back |
| 5 | `DELETE /publicaciones/:id` (baja lógica, 403) | Back |
| 6 | `POST` y `DELETE /publicaciones/:id/like` (409 y 404) | Back |
| 7 | Sesión en `localStorage` e interceptores (token y reintento) | Front |
| 8 | Servicio de publicaciones y componente `TarjetaPublicacion` (`Publicacion` ya es el nombre del modelo) | Front |
| 9 | Página de publicaciones: listado, orden, paginado, filtro, me gusta y borrar con modal + `GET /publicaciones/mis-likes` | Front y back |
| 10 | Formulario para publicar | Front |
| 11 | Mi Perfil: datos, foto y últimas 3 publicaciones con sus comentarios + `GET /publicaciones/:id/comentarios` (adelantado del Sprint 3) | Front y back |

### Conceptos no vistos que pide el Sprint 2 (decididos el 01/11)

| # | Concepto | Para qué | Opciones | Decisión |
|---|---|---|---|---|
| 1 | `.sort()` de Mongoose | Ordenar por fecha o por me gusta (lo pide el enunciado) | No hay una alternativa razonable | ✅ Usarlo |
| 2 | `.skip()` y `.limit()` | Paginar con `offset` y `limit` (lo pide el enunciado) | No hay una alternativa razonable | ✅ Usarlos |
| 3 | Contador de me gusta | Poder ordenar por me gusta | **A:** campo `cantidadLikes` actualizado con `$inc` (una línea, sin errores si llegan dos a la vez) · **B:** leer, sumar 1 y guardar (visto, pero dos me gusta simultáneos pueden contar uno solo) | ✅ A: `$inc` |
| 4 | Un solo me gusta por usuario | Responder 409 | **A:** `findOne` antes de crear, como el 409 del registro · **B:** además, índice único compuesto `(publicacion, usuario)` | ✅ A: `findOne` antes de crear |
| 5 | `ForbiddenException` | 403 al borrar una publicación ajena | La misma familia que `UnauthorizedException` y `ConflictException` | ✅ `ForbiddenException` |
| 6 | Fecha de la publicación | Ordenar por fecha y mostrarla | **A:** `@Prop({ default: Date.now })` (`default` es visto) · **B:** `timestamps: true` | ✅ A: `default: Date.now` |
| 7 | Sesión en `localStorage` desde ahora (en el plan era del Sprint 3) | Que el token no se pierda al recargar | `localStorage` se vio en el ejemplo de guards (`Ej-clase-5`) | ✅ Sí, desde ahora |
| 8 | Interceptores de Angular | Token en el header y reintento de los `GET` | Vistos el 29/10, pero falta el ejemplo del profe | ✅ Sí, lo más sencillo posible |
| 9 | `collection: 'publicaciones'` en el `@Schema` | Que la colección se llame "publicaciones" y no "publicacions" (Mongoose agrega una "s" al nombre del modelo) | Es una opción del schema, como `toJSON` | ✅ Agregarla |
| 10 | Saber a qué publicaciones ya les di me gusta | Mostrar el ♥ y elegir entre dar o quitar ("siempre que sea el caso") | **A:** `GET /publicaciones/mis-likes` con `find` + `select` (visto) · **B:** un campo `meGusta` en cada publicación del listado (hay que convertir los documentos de Mongoose: no visto) · **C:** recordarlo solo en el front (se pierde al recargar) | ✅ A (07/11) |
| 11 | Comentarios con los datos de quien comentó (Mi Perfil) | Mostrar nombre, @usuario y foto de cada comentario | **A:** `GET /publicaciones/:id/comentarios` con `populate('autor', ...)`, adelantado del Sprint 3 (visto) · **B:** populate anidado sobre el virtual `comentarios` de la publicación (no visto) | ✅ A (07/11) |

### Back
- [x] `AuthGuard` que lee el token del header y deja el usuario en `request.user`
- [x] **`POST /publicaciones`**: título, mensaje, categoría e imagen opcional (a Cloudinary),
      relacionada con el usuario del token
- [x] **`GET /publicaciones`** con parámetros:
  - [x] `orden=fecha|likes` (por defecto, fecha)
  - [x] `usuario=<id>` para filtrar las de un usuario
  - [x] `offset` y `limit` para paginar
  - [x] `categoria` (extra de Potrero Libre)
- [x] **`DELETE /publicaciones/:id`**: baja lógica, solo el autor o un administrador (si no, **403**)
- [x] **`POST /publicaciones/:id/like`**: un solo me gusta por usuario (`findOne` antes de crear → **409**); suma con `$inc`
- [x] **`DELETE /publicaciones/:id/like`**: solo si lo había dado (si no, **404**)
- [x] **`GET /publicaciones/mis-likes`**: los ids de las publicaciones a las que les di me gusta (para el ♥ del front)
- [x] Schema `Comentario` + `ComentariosController` con **`GET /publicaciones/:id/comentarios`** (Mi Perfil los muestra; el POST y el PUT son del Sprint 3)
- [x] Back desplegado (a más tardar en este sprint)

### Front
- [x] Sesión guardada en `localStorage` (no se pierde al recargar)
- [x] Interceptor que agrega el token (`Authorization: Bearer`) a los pedidos que van al back (visto el 29/10)
- [x] Interceptor que reintenta los `GET` fallidos con retroceso exponencial, pocas veces (visto el 29/10): 3 reintentos (1 s, 2 s y 4 s), nunca los 4xx
- [x] Página de publicaciones: listado ordenado por fecha, cambio a "por me gusta", paginación (5 por página)
- [x] **Cada publicación es un componente** (`TarjetaPublicacion`)
- [x] Dar y quitar me gusta; borrar las publicaciones propias (con modal de confirmación: `ModalConfirmacion`)
- [x] Formulario para crear una publicación (`FormularioPublicacion`)
- [x] **Mi Perfil:** todos los datos del usuario, su foto y sus últimas 3 publicaciones con sus comentarios

### Potrero Libre
- [x] Categorías: **General**, **Busco club**, **Busco jugadores**, **Prueba** (convocatoria)
- [x] Filtro por categoría en el listado

**Definición de hecho:** dos usuarios publican; uno le da me gusta a la del otro, un segundo
me gusta se rechaza, y el orden "por me gusta" cambia. ✅ **Cumplida** (07/11, en el laboratorio).

### Correcciones de la presentación (10/11)

| # | Corrección | Cómo se resuelve | Estado |
|---|---|---|---|
| 1 | Iniciar sesión con el **nombre de usuario o el correo** | Back: `LoginDto` recibe `usuario` (antes `email`); el servicio busca primero con `buscarPorEmail` y, si no encuentra, con `buscarPorUsername` (los dos ya existían). Front: un solo campo "Correo o nombre de usuario" con el validador `validarUsuarioOCorreo` (si tiene @, se controla como correo, así sigue el aviso de "prueba@m") | ⏳ Probado en una copia; falta pasarlo |
| 2 | **Acceso rápido** de administrador en el login | Botón "Ingresar como administrador" que llama al mismo login con la cuenta de prueba `administrador`. La cuenta se crea con el registro y después se le cambia `perfil` a `administrador` en Atlas (crear administradores desde la app es del Sprint 4) | ⏳ Probado en una copia; falta pasarlo |
| 3 | Un título o un mensaje **sin espacios** se salía de la tarjeta | `overflow-wrap: anywhere` en `h1, h2, h3, p, dd` (`styles.css`): la palabra se corta donde haga falta. Cubre publicaciones, comentarios y Mi Perfil | ⏳ Probado en una copia; falta pasarlo |
| 4 | Pregunta: ¿por qué `cargarMisMeGusta()` y `cargar()` están separados? | Son dos pedidos con ritmos distintos: los me gusta del usuario se piden una vez al entrar, y el listado cada vez que cambian el orden, la categoría o la página. Además, si falla uno, el otro se muestra igual | ✅ Respondida |

---

## Sprint 3 — Comentarios y sesión · 09/11 → 12/11 · se presenta el jue 12/11

**Objetivo:** comentar, y una sesión de 15 minutos que avisa antes de vencer.

### Pasos

| Paso | Qué | Dónde |
|---|---|---|
| 1 | `GET /publicaciones/:id` y comentarios paginados (`offset` y `limit`) | Back · ✅ pusheado |
| 2 | `POST /publicaciones/:id/comentarios` y `PUT /comentarios/:id` (403 si no es el autor, `modificado: true`) + rechazo de textos con solo espacios | Back · ✅ pusheado (al controller le faltaban las rutas: van en el zip de los pasos 3 a 8) |
| 3 | Página de una publicación (`/publicacion/:id`): grande, con sus comentarios y "Cargar más" (de a 5) | Front · ✅ probado |
| 4 | Escribir comentarios y editar los propios ("(editado)") | Front · ✅ probado |
| 5 | `POST /auth/autorizar` y `POST /auth/refrescar` (reemplazan a `GET /auth/perfil`), y cada login o registro anotado en `ingresos` | Back · ✅ probado (Postman 54/54) |
| 6 | Guards de sesión (`sesionGuard` e `invitadoGuard`) y 401 → login con el aviso "Tu sesión venció" | Front · ✅ probado |
| 7 | Pantalla de cargando con spinner en la ruta inicial, que valida el token con `autorizar` | Front · ✅ probado |
| 8 | Contador de 10 minutos y modal para extender la sesión (`refrescar`) | Front · ✅ probado (con 30 s / 20 s) |

Los pasos 3 a 8 se entregaron juntos el 12/11 (día de la presentación), en un zip para copiar sobre el laboratorio.

✅ **Sprint 3 pasado a entrega el 12/11** (commit `e45ff4e`): el código de entrega es igual al del laboratorio. Compilan los dos proyectos; Postman da 54/54 (Sprint 3) y 52/52 (Sprint 2), y el recorrido en el navegador da lo esperado.

### Conceptos no vistos que pide el Sprint 3 (✅ decididos el 12/11: las tres A)

| # | Concepto | Para qué | Opciones |
|---|---|---|---|
| 1 | Pantalla de cargando | "Al iniciar la aplicación… validar el token contra autorizar" | ✅ **A:** componente `Cargando` en la ruta inicial que llama a `autorizar` y navega con `router.navigate` (visto) · **B:** `provideAppInitializer`, como en el TP-1 (no está en los ejemplos de clase) |
| 2 | Contador de 10 minutos que no se reinicie al recargar | El modal de "quedan 5 minutos" | ✅ **A:** guardar la hora del login en la sesión del `localStorage` y calcular cuánto falta, con `setTimeout` (visto) y `clearTimeout` para cancelarlo (no visto, es su par) · **B:** leer el vencimiento de adentro del token (no visto) · **C:** arrancar 10 minutos en cada carga (falla si se recarga en el minuto 8) |
| 3 | 401 → login | "Si una petición devuelve 401, redirigir al login" | ✅ **A:** un tercer interceptor con `catchError` de RxJS (misma familia que `retry`), salvo en el propio login · **B:** repetirlo en el `error:` de cada pedido |

**Otras piezas que usa el Sprint 3:** `@Put` (en clase se vio `@Patch`; el enunciado pide PUT), `@Matches(/\S/)`
para rechazar textos de solo espacios (regex, como la de la contraseña), `throwError` junto con `catchError`,
y `@keyframes` en el CSS del spinner. Para el formulario de comentar se vuelve a armar el `FormGroup` con
`fb.group` (visto) en lugar de `reset()` o `setValue()` (no vistos).

**Para la presentación con el token de 30 s:** `expiresIn: '30s'` en `app.module.ts` y `AVISO_MS = 20 * 1000`
en `servicios/autenticacion.ts` (el aviso aparece a los 20 s). Después, volver a `'15m'` y `10 * 60 * 1000`.

### Back
- [x] **`GET /publicaciones/:id/comentarios`**: paginado, los más recientes primero
      (adelantado en el Paso 11 del Sprint 2: ya ordena y trae el autor; falta paginar con `offset` y `limit`)
- [x] **`GET /publicaciones/:id`** para la página de una publicación (ojo: declararlo **después** de `@Get('mis-likes')`,
      si no Nest toma "mis-likes" como un id)
- [x] **`POST /publicaciones/:id/comentarios`**: con el usuario del token y la fecha
- [x] **`PUT /comentarios/:id`**: solo el autor; marca `modificado: true`
- [x] Token con id, username y perfil; **vence a los 15 minutos**
- [x] **`POST /auth/autorizar`**: token inválido o vencido → **401**; si es válido, devuelve el usuario
- [x] **`POST /auth/refrescar`**: nuevo token con el mismo payload y otros 15 minutos
- [x] Empezar a registrar cada login en `ingresos` (para el Sprint 5)

### Front
- [x] Página de **una publicación**: grande, con sus comentarios uno debajo del otro
- [x] Primera carga limitada y botón **"cargar más"** que suma sin borrar los anteriores
- [x] Escribir comentarios; editar el propio, que queda marcado como **"(editado)"**
- [x] Guardar el token en el navegador al hacer login o registro (hecho en el Paso 7 del Sprint 2)
- [x] **Pantalla de carga** con spinner que valida el token contra `/auth/autorizar`
      y redirige a publicaciones o al login (como el `provideAppInitializer` del TP-1)
- [x] A los 10 minutos de iniciar sesión, **modal**: "quedan 5 minutos, ¿extender la sesión?"
      → `/auth/refrescar`
- [x] Cualquier **401** redirige al login
- [x] Guards de sesión en todas las rutas

**Definición de hecho:** dejar la sesión abierta 10 minutos, ver el modal, extenderla y seguir
usando la app sin volver a iniciar sesión.

---

## Sprint 4 — Administrador y estadísticas · 13/11 → 17/11 · se presenta el mar 17/11

**Objetivo:** el panel del administrador y cerrar los requisitos de la aplicación.

**Orden sugerido:** como el Sprint 4 tiene solo 5 días, el back (usuarios, guard de roles y
estadísticas) conviene empezarlo durante el Sprint 3, si sobra tiempo. Después, el front del
dashboard, la PWA, los pipes y las directivas, que ya se hicieron en el TP-1.

### Back
- [ ] **Guard de roles**: solo `administrador`
- [ ] **Usuarios controller** (solo administrador):
  - [ ] `GET` listado de usuarios
  - [ ] `POST` alta de un usuario eligiendo si es `usuario` o `administrador`
  - [ ] `DELETE` deshabilitar (baja lógica)
  - [ ] `POST` rehabilitar (alta lógica)
- [ ] Login de un usuario deshabilitado → rechazado con un mensaje claro
- [ ] Baja de una publicación por un administrador: también dejan de verse sus comentarios
- [ ] **Estadísticas controller** (solo administrador), con agregaciones y rango de fechas:
  - [ ] Publicaciones por usuario
  - [ ] Comentarios en el lapso
  - [ ] Comentarios por publicación

### Front
- [ ] Botón de baja de **cualquier** publicación visible solo para administradores
- [ ] **`dashboard/usuarios`**: listado, alta con radio buttons `usuario`/`administrador`,
      habilitar y deshabilitar
- [ ] **`dashboard/estadisticas`**: tres gráficos de **tipos distintos** (torta, barras, líneas)
      con selector de rango de fechas
- [ ] **PWA**
- [ ] **3 pipes propios**, por ejemplo: edad a partir de la fecha de nacimiento, "hace 2 horas",
      posición abreviada (Delantero → DEL)
- [ ] **3 directivas propias**, por ejemplo: resaltar publicaciones "Busco club", imagen de
      respaldo para fotos rotas, y una más a definir

**Definición de hecho:** un administrador deshabilita una cuenta, esa cuenta no puede entrar y
ve el motivo; los tres gráficos cambian al mover el rango de fechas.

---

## Colchón — 18/11 · entrega y defensa el jue 19/11

- [ ] Terminar lo que haya quedado pendiente del Sprint 4
- [ ] Llevar las dudas que queden a la clase del **mar 17/11** (la misma de la presentación del Sprint 4)
- [ ] Recorrer el flujo completo en la URL pública, con los tres tipos de cuenta
- [ ] Revisar que **ningún error responda 200 y ninguna respuesta correcta responda 400**
- [ ] README con arquitectura y decisiones técnicas (como el del TP-1)
- [ ] Usuarios de prueba para la defensa: un administrador, un jugador, un DT y un club

---

## Después de la entrega (solo si hace falta)

- **Sprint 5 — Recuperatorio:** perfil de otros usuarios (el *scouting*: un club mira a un
  jugador), scroll infinito, y estadísticas de ingresos, visitas al perfil y me gusta por día.
- **Sprint 6 — Final:** guardados (lista de seguimiento de jugadores), compartir una
  publicación con otro usuario (un DT le recomienda un jugador a un club) y los ordenamientos
  por guardados y por compartidos.
- **Extras de Potrero Libre** (no se evalúan): estadísticas deportivas del jugador y del club
  (partidos, goles, asistencias), datos del plantel y posiciones que busca cada club.

---

## Riesgos

| Riesgo | Qué se hace |
|---|---|
| Subir credenciales a un repo público (pasó el 31/10 con el `.env.example`) | El `.env.example` va siempre **sin valores**; los valores solo en el `.env`, que no se sube. Una clave que se subió se cambia en el servicio, porque queda en el historial |
| El Sprint 4 es el más cargado y tiene solo 5 días (13/11 → 17/11) | Empezar su back durante el Sprint 3, que tiene 7 días con el feriado. El colchón es un solo día (18/11) |
| Los Sprints 1 y 3 tienen tramos cortos (2 o 3 días) | El 1 arranca con todo creado en el Sprint 0; el 3 reutiliza la sesión del TP-1 (`provideAppInitializer`, guards) |
| En el plan gratuito de Vercel, la primera petición después de un rato puede tardar (el back arranca "en frío") | Avisarlo en la defensa y abrir la app unos minutos antes |
| Subir imágenes en `multipart` es nuevo | Cloudinary y los interceptores se vieron el 27/10: se sigue el ejemplo del profe apenas esté en Programacion-IV |
| El enunciado pide en el Sprint 2 mostrar comentarios que se crean en el 3 | El modelo de comentarios se crea en el Sprint 2 |
