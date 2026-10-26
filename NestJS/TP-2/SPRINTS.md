# Potrero Libre — Plan de sprints

**Trabajo Práctico Nº 2 — Programación IV — Red social**
**Autor:** Facundo Ibarra
**Idea:** red social de fútbol amateur. Jugadores sin club, directores técnicos y clubes
(administrados por su delegado) se encuentran, publican y se siguen.

**Stack:** Angular 22 (front) · NestJS 12 (back) · MongoDB Atlas · JWT.

---

## Calendario

Las clases son los **martes y jueves**, y en cada una se puede presentar el avance al
profesor. Cada sprint termina el día de una clase, así se presenta apenas está hecho.

| Fecha | Día | Qué pasa |
|---|---|---|
| 26/10 | lunes | Sprint 0: decisiones, cuentas y proyectos creados |
| **27/10** | martes | **Clase — presentación del Sprint 0** (idea, plan y decisiones) y consultas |
| 27/10 → 29/10 | mar → jue | **Sprint 1** — registro, login y base de los dos proyectos |
| **29/10** | jueves | **Clase — presentación del Sprint 1** |
| 30/10 → 03/11 | vie → mar | **Sprint 2** — publicaciones y me gusta |
| **03/11** | martes | **Clase — presentación del Sprint 2** |
| 04/11 → 05/11 | mié → jue | **Sprint 3** — comentarios y sesión con JWT de 15 minutos |
| **05/11** | jueves | **Clase — presentación del Sprint 3** |
| 06/11 → 12/11 | vie → jue | **Sprint 4** — administrador, estadísticas, PWA, pipes y directivas |
| 10/11 | martes | Clase — avance del Sprint 4 (back del administrador y estadísticas) |
| **12/11** | jueves | **Clase — presentación del Sprint 4 · Finalización estimada** |
| 13/11 → 18/11 | vie → mié | Colchón: pruebas en la URL pública, README y preparación de la defensa |
| 17/11 | martes | Clase — última consulta antes de la entrega |
| **19/11** | jueves | **Clase — Entrega y defensa** |

**Cómo se repartieron los días.** Entre clase y clase hay 2 días (martes → jueves) o 5
(jueves → martes, con el fin de semana). Los dos sprints más pesados se llevan los tramos
largos: el **Sprint 2** tiene 5 días y el **Sprint 4**, 7, con una presentación de avance
en el medio. Los Sprints 1 y 3 son más acotados y entran en tramos de 2 o 3 días; el 1 además
arranca con las cuentas y los proyectos ya creados en el Sprint 0.

El colchón del 13 al 18 existe para absorber atrasos: si algo no llegó al 12/11, se termina
ahí, no se recorta. La clase del 17/11 sirve para una última consulta.

### Consultas para la clase del 27/10

1. El enunciado subido dice **"2026 C1"**: ¿es la versión vigente para este cuatrimestre?
2. Para el 19/11, ¿se entregan los **Sprints 1 a 4**? (el 5 es de recuperatorio y el 6, del final)
3. ¿Está bien que la **cuenta de un club la maneje su delegado**, con el registro de una persona?
4. El enunciado pide en el **Sprint 2** mostrar en Mi Perfil comentarios cuyo controller es
   del **Sprint 3**: ¿se acepta mostrarlos recién en el Sprint 3?
5. ¿Alcanza con devolver el token en la respuesta y mandarlo en el header, en lugar de cookies?

Los **Sprints 5 (recuperatorio) y 6 (final)** quedan fuera de esta entrega. Igual se tienen
en cuenta desde el diseño: las colecciones que necesitan sus estadísticas (`ingresos`,
`visitas`, `likes` con fecha) se crean antes, para que cuando lleguen haya datos.

---

## Decisiones tomadas

| # | Decisión | Por qué |
|---|---|---|
| 1 | Dos atributos distintos: **`perfil`** (`usuario` \| `administrador`) y **`tipo`** (`jugador` \| `dt` \| `club`) | El enunciado usa "perfil" para el rol; el tipo de cuenta futbolero es otra cosa |
| 2 | **La cuenta de un club la maneja su delegado** | El registro del TP pide nombre, apellido y fecha de nacimiento: son los del delegado. Los datos del club van en el perfil |
| 3 | Token en el header **`Authorization: Bearer`** + interceptor en Angular | Front y back en dominios distintos: una cookie sería de terceros y los navegadores la bloquean |
| 4 | **JWT desde el Sprint 1**, aunque el enunciado lo pida en el 3 | En el Sprint 2 hay que saber quién da me gusta y quién borra |
| 5 | Imágenes en **Cloudinary** | El disco de un hosting gratuito se borra en cada deploy |
| 6 | `likes`, `comentarios`, `guardados` y `compartidos` en **colecciones propias**, con índice único donde corresponda | La base garantiza "un solo me gusta"; la fecha de cada uno alimenta las estadísticas del Sprint 5 |
| 7 | **Login por correo** (único). El nombre de usuario también es único | Lo exige el enunciado para el campo que se use en el login |
| 8 | Repo nuevo para el TP-2 con `backend/` y `frontend/` | Igual que el TP-1: cada proyecto con su deploy |
| 9 | **Nada de `alert()` ni `confirm()`**: siempre modales | Lo prohíbe el enunciado (ojo: el `formGuard` del TP-1 usaba `confirm()`) |
| 10 | **Todas las pantallas requieren sesión** (salvo login y registro) | "Solo se puede acceder a la aplicación estando registrado o logueado" |

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

- [ ] Repo nuevo en GitHub con `backend/` y `frontend/`
- [ ] `nest new backend` (NestJS 12, igual que `ejercicio-1`)
- [ ] `ng new frontend` (Angular 22, standalone, igual que el TP-1)
- [ ] Base `potrero-libre` en el cluster de Atlas y `MONGO_URI` en el `.env` (que no se sube)
- [ ] Cuenta de Cloudinary y sus tres claves en el `.env`
- [ ] Proyecto de Firebase Hosting para el front
- [ ] Identidad visual: paleta (verde césped, blanco de cal…), tipografía y logo de "Potrero Libre"
- [ ] Favicon propio

---

## Sprint 1 — Registro y login · 27/10 → 29/10 · se presenta el jue 29/10

**Objetivo:** un usuario se registra con su foto, inicia sesión y navega las cuatro pantallas.

### Back
- [ ] Módulos `usuarios`, `autenticacion` y `publicaciones` (este último puede quedar vacío)
- [ ] Schema `Usuario` con `perfil` (por defecto `usuario`), `tipo` y `activo`
- [ ] `ValidationPipe` global con `whitelist`, `forbidNonWhitelisted` y `transform`
- [ ] CORS habilitado para el dominio del front
- [ ] **`POST /auth/registro`** (`multipart/form-data`):
  - [ ] DTO con todas las validaciones (contraseña: 8 caracteres, una mayúscula y un número)
  - [ ] Contraseña encriptada con **bcrypt**
  - [ ] Imagen recibida con `FileInterceptor` y subida a Cloudinary; se guarda la URL
  - [ ] Email o username repetido → **409**
  - [ ] Respuesta **201** con el usuario **sin** la contraseña y con el token
- [ ] **`POST /auth/login`**:
  - [ ] Credenciales incorrectas → **401**
  - [ ] Respuesta con todos los datos del usuario (sin contraseña) y el token
- [ ] `JwtModule` con el secreto leído del `.env`, no escrito en el código
- [ ] Recomendado: primer deploy del back (Render o Railway)

### Front
- [ ] Pantallas: **Registro**, **Login**, **Publicaciones** y **Mi Perfil**
- [ ] Navegación entre pantallas, sin restricciones de acceso todavía
- [ ] **Login:** formulario con validaciones y mensajes
- [ ] **Registro:** nombre, apellido, correo, nombre de usuario, contraseña, repetir contraseña,
      fecha de nacimiento, descripción breve, imagen de perfil (campo file) y **tipo de cuenta**
- [ ] Validador propio de contraseña y validación cruzada de "repetir contraseña"
- [ ] Deploy en Firebase Hosting y favicon propio

**Nuevo en este sprint:** bcrypt, subida de archivos con `FileInterceptor`, Cloudinary, y
validar un `multipart` (todos los campos llegan como texto: la fecha hay que transformarla).

**Definición de hecho:** registrarse con foto desde la URL pública, ver la foto guardada en
Cloudinary y la contraseña encriptada en Atlas, e iniciar sesión con esa cuenta.

---

## Sprint 2 — Publicaciones y me gusta · 30/10 → 03/11 · se presenta el mar 03/11

**Objetivo:** publicar, listar, ordenar, paginar y dar me gusta.

### Back
- [ ] `AuthGuard` que lee el token del header y deja el usuario en `request.user`
- [ ] **`POST /publicaciones`**: título, mensaje, categoría e imagen opcional (a Cloudinary),
      relacionada con el usuario del token
- [ ] **`GET /publicaciones`** con parámetros:
  - [ ] `orden=fecha|likes` (por defecto, fecha)
  - [ ] `usuario=<id>` para filtrar las de un usuario
  - [ ] `offset` y `limit` para paginar
  - [ ] `categoria` (extra de Potrero Libre)
- [ ] **`DELETE /publicaciones/:id`**: baja lógica, solo el autor o un administrador (si no, **403**)
- [ ] **`POST /publicaciones/:id/like`**: un solo me gusta por usuario (índice único → **409**)
- [ ] **`DELETE /publicaciones/:id/like`**: solo si lo había dado (si no, **404**)
- [ ] Schema `Comentario` creado (Mi Perfil ya los muestra; los endpoints son del Sprint 3)
- [ ] Back desplegado (a más tardar en este sprint)

### Front
- [ ] Interceptor que agrega el token a cada pedido
- [ ] Página de publicaciones: listado ordenado por fecha, cambio a "por me gusta", paginación
- [ ] **Cada publicación es un componente**
- [ ] Dar y quitar me gusta; borrar las publicaciones propias (con modal de confirmación)
- [ ] Formulario para crear una publicación
- [ ] **Mi Perfil:** todos los datos del usuario, su foto y sus últimas 3 publicaciones con sus comentarios

### Potrero Libre
- [ ] Categorías: **General**, **Busco club**, **Busco jugadores**, **Prueba** (convocatoria)
- [ ] Filtro por categoría en el listado

**Definición de hecho:** dos usuarios publican; uno le da me gusta a la del otro, un segundo
me gusta se rechaza, y el orden "por me gusta" cambia.

---

## Sprint 3 — Comentarios y sesión · 04/11 → 05/11 · se presenta el jue 05/11

**Objetivo:** comentar, y una sesión de 15 minutos que avisa antes de vencer.

### Back
- [ ] **`GET /publicaciones/:id/comentarios`**: paginado, los más recientes primero
- [ ] **`POST /publicaciones/:id/comentarios`**: con el usuario del token y la fecha
- [ ] **`PUT /comentarios/:id`**: solo el autor; marca `modificado: true`
- [ ] Token con id, username y perfil; **vence a los 15 minutos**
- [ ] **`POST /auth/autorizar`**: token inválido o vencido → **401**; si es válido, devuelve el usuario
- [ ] **`POST /auth/refrescar`**: nuevo token con el mismo payload y otros 15 minutos
- [ ] Empezar a registrar cada login en `ingresos` (para el Sprint 5)

### Front
- [ ] Página de **una publicación**: grande, con sus comentarios uno debajo del otro
- [ ] Primera carga limitada y botón **"cargar más"** que suma sin borrar los anteriores
- [ ] Escribir comentarios; editar el propio, que queda marcado como **"(editado)"**
- [ ] Guardar el token en el navegador al hacer login o registro
- [ ] **Pantalla de carga** con spinner que valida el token contra `/auth/autorizar`
      y redirige a publicaciones o al login (como el `provideAppInitializer` del TP-1)
- [ ] A los 10 minutos de iniciar sesión, **modal**: "quedan 5 minutos, ¿extender la sesión?"
      → `/auth/refrescar`
- [ ] Cualquier **401** redirige al login
- [ ] Guards de sesión en todas las rutas

**Definición de hecho:** dejar la sesión abierta 10 minutos, ver el modal, extenderla y seguir
usando la app sin volver a iniciar sesión.

---

## Sprint 4 — Administrador y estadísticas · 06/11 → 12/11 · se presenta el jue 12/11

**Objetivo:** el panel del administrador y cerrar los requisitos de la aplicación.

**Orden sugerido:** el back primero (usuarios, guard de roles y estadísticas), para mostrarlo
como avance en la clase del **mar 10/11**; después, el front del dashboard, la PWA, los pipes
y las directivas, que ya se hicieron en el TP-1.

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

## Colchón — 13/11 → 18/11 · entrega y defensa el jue 19/11

- [ ] Terminar lo que haya quedado pendiente del Sprint 4
- [ ] Llevar las dudas que queden a la clase del **mar 17/11**
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
| El Sprint 4 es el más cargado | Tiene el tramo más largo (7 días), avance a mitad de camino el 10/11 y el colchón del 13 al 18 |
| Los Sprints 1 y 3 tienen tramos cortos (2 o 3 días) | El 1 arranca con todo creado en el Sprint 0; el 3 reutiliza la sesión del TP-1 (`provideAppInitializer`, guards) |
| El hosting gratuito del back "se duerme" y tarda en responder | Avisarlo en la defensa y abrir la app unos minutos antes |
| Subir imágenes en `multipart` es nuevo | Se hace en el Sprint 1, cuando todavía hay margen |
| El enunciado pide en el Sprint 2 mostrar comentarios que se crean en el 3 | El modelo de comentarios se crea en el Sprint 2 |
