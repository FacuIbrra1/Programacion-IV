# Documento de Requerimientos — Sistema de Gestión y Venta de Entradas de Cine

**Trabajo Práctico Nº 1 — Programación IV — UTN FRA — 2026 C2**
**Autor:** Facundo Ibarra
**Versión:** 1.0 — 08/09/2026
**Fuente:** intercambio de correos con el cliente ("Empresario Importante"), 10 mensajes entre el 01/01 y el 10/03.

---

## 1. Objetivo

Desarrollar una aplicación web para un complejo de cine de un único edificio con varias
salas, que permita a los clientes comprar entradas y productos del candy bar de forma
autogestionada, al personal validar el ingreso mediante códigos QR, y a la administración
gestionar la cartelera, la programación de funciones, los precios, las promociones y los
reportes de explotación.

## 2. Alcance

### 2.1 Incluido

Venta de entradas con selección de butacas, gestión de cartelera y funciones con asignación
automática de sala, registro y fidelización de clientes, candy bar, emisión y validación de
entradas por QR, reseñas de películas, panel de administración con reportes y auditoría.

### 2.2 Excluido

| Funcionalidad | Motivo |
|---|---|
| Mapa del edificio indicando la sala de la función | El cliente lo mencionó en el correo del 30/01 aclarando que **"no tenemos luz verde aún"**. Se documenta como evolución futura. |
| Pasarela de pago real | No solicitada. Se simula el cobro; el foco está en la lógica de negocio. |
| Aplicación móvil nativa | Se resuelve con **PWA instalable**. |

## 3. Actores

| Actor | Descripción | Acceso |
|---|---|---|
| **Visitante / Cliente anónimo** | Navega la cartelera y compra sin registrarse. No accede a beneficios. | Público |
| **Cliente registrado** | Compra con beneficios: cupones, puntos, crédito e historial. | Autenticado |
| **Empleado** | Valida entradas y entregas del candy bar mediante QR. | Autenticado, rol empleado |
| **Administrador** | Gestiona todo el sistema y accede a reportes y auditoría. | Autenticado, rol admin |

## 4. Glosario

- **Función**: proyección de una película en una sala, en una fecha y hora determinadas, con un formato y un idioma.
- **Butaca accesible**: asiento adaptado para personas con discapacidad, ubicado en la fila que reemplazó a las filas J y K.
- **Butaca VIP**: asiento de las filas R, S y T, con precio diferencial.
- **Preventa**: período de hasta 7 días previos al estreno en el que se venden entradas a un precio especial.
- **Crédito**: saldo a favor generado por la cancelación de una compra, utilizable en compras futuras.

---

## 5. Requerimientos funcionales

Prioridad: **A** (imprescindible para que el sistema funcione) · **M** (esperado por el cliente) · **B** (deseable).
La columna *Origen* indica la fecha del correo que lo solicita.

### 5.1 Salas y butacas (SAL)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-SAL-01 | El administrador debe poder dar de alta, modificar y baja las salas del complejo. | A | 06/02 |
| RF-SAL-02 | Todas las salas comparten la misma distribución de butacas. | A | 01/01 |
| RF-SAL-03 | La distribución base es de 20 filas identificadas con letras (A–T), divididas en 3 columnas de 4, 20 y 4 butacas (28 por fila). | A | 01/01 |
| RF-SAL-04 | Las filas J y K se eliminan y se reemplazan por una fila de butacas accesibles con 3 columnas de 2, 10 y 2 butacas (14 en total). | A | 12/02 |
| RF-SAL-05 | Las tres últimas filas (R, S y T) son butacas VIP. | M | 10/03 |
| RF-SAL-06 | El mapa de butacas debe diferenciar visualmente los estados: libre, ocupada, seleccionada, accesible y VIP. | A | 12/02, 10/03 |
| RF-SAL-07 | El administrador debe poder gestionar la distribución de butacas. | M | 06/02 |

> **Capacidad resultante por sala:** 18 filas × 28 butacas + 1 fila accesible × 14 butacas = **518 butacas**, de las cuales 84 son VIP y 14 accesibles.

### 5.2 Películas (PEL)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-PEL-01 | ABM de películas con nombre, sinopsis, imagen y duración. | A | 01/01 |
| RF-PEL-02 | Una película puede pertenecer a varios géneros. | A | 16/01 |
| RF-PEL-03 | Cada película tiene una restricción de edad: sin restricción, 13 años o 18 años. | A | 12/02 |
| RF-PEL-04 | El administrador decide qué películas se muestran en la página principal. | M | 01/01 |
| RF-PEL-05 | Cada película registra su fecha de estreno. | A | 08/03 |
| RF-PEL-06 | La preventa se configura película por película: si está habilitada, desde cuándo y a qué precio. | M | 08/03 |

### 5.3 Funciones (FUN)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-FUN-01 | ABM de funciones, indicando película, fecha, hora, formato e idioma. | A | 01/01, 06/02 |
| RF-FUN-02 | Formatos disponibles: 2D, 3D, 4D y 5D. | A | 01/01 |
| RF-FUN-03 | Idiomas disponibles: castellano y subtitulada. | A | 01/01 |
| RF-FUN-04 | El administrador programa una película indicando días y horario; **el sistema asigna la sala automáticamente**. | A | 06/02 |
| RF-FUN-05 | El sistema debe impedir que dos funciones se superpongan en la misma sala. | A | 06/02 |
| RF-FUN-06 | Entre el fin de una función y el comienzo de la siguiente en la misma sala deben transcurrir **al menos 30 minutos**. | A | 01/01 |
| RF-FUN-07 | Si no existe ninguna sala disponible para el horario solicitado, el sistema informa el conflicto y no crea la función. | A | derivado |

### 5.4 Usuarios y acceso (USR)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-USR-01 | Registro de clientes con correo, nombre, apellido, fecha de nacimiento, tipo de sangre, color de ojos y cantidad de días de vacaciones por año. | A | 01/01 |
| RF-USR-02 | Inicio y cierre de sesión. | A | derivado |
| RF-USR-03 | Se puede comprar sin registrarse, sin acceso a beneficios. | A | 01/01 |
| RF-USR-04 | El sistema distingue tres roles: cliente, empleado y administrador. | A | 06/02 |
| RF-USR-05 | El administrador gestiona las cuentas de los empleados. | M | 06/02 |
| RF-USR-06 | El cliente registrado accede a un perfil con sus puntos, crédito, historial de canjes e historial de películas. | M | 03/03, 08/03 |

### 5.5 Compra (COM)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-COM-01 | El cliente selecciona una función y elige sus butacas en el mapa de la sala. | A | 01/01 |
| RF-COM-02 | El mapa muestra **en tiempo real** las butacas que están siendo ocupadas por otra compra en ese mismo momento. | A | 12/02 |
| RF-COM-03 | El sistema debe impedir que una misma butaca se venda dos veces. | A | derivado |
| RF-COM-04 | Se pueden agregar productos del candy bar a la misma compra. | M | 30/01 |
| RF-COM-05 | Confirmada la compra, se genera un **PDF con los datos de la entrada y un código QR**. | A | 01/01 |
| RF-COM-06 | El sistema impide comprar entradas de películas restringidas a usuarios menores a la edad requerida. | A | 12/02 |
| RF-COM-07 | Las entradas de películas con restricción de edad deben aclarar que el espectador debe concurrir con un adulto. | M | 12/02 |
| RF-COM-08 | Antes de pagar, el cliente debe ver de forma explícita que está comprando butacas VIP. | M | 10/03 |
| RF-COM-09 | El cliente puede cancelar una compra hasta **2 horas antes** del inicio de la función. | M | 10/03 |
| RF-COM-10 | La cancelación no devuelve dinero: acredita **crédito** en la cuenta del cliente. | M | 10/03 |
| RF-COM-11 | El crédito se muestra en el perfil y puede combinarse con otros medios de pago. | M | 10/03 |
| RF-COM-12 | Al cancelarse una compra, sus butacas vuelven a estar disponibles. | A | supuesto |

### 5.6 Precios y promociones (PRE)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-PRE-01 | Los clientes que se registran obtienen un cupón de descuento para su primera compra. | M | 01/01 |
| RF-PRE-02 | El porcentaje de ese cupón es configurable por el administrador (valor inicial: 20 %). | M | 30/01 |
| RF-PRE-03 | El administrador puede crear cupones dirigidos a segmentos de clientes, por ejemplo mayores de 50 años. | M | 30/01 |
| RF-PRE-04 | Las butacas VIP tienen un precio superior al de las butacas comunes. | M | 10/03 |
| RF-PRE-05 | Durante la preventa (hasta 7 días antes del estreno) rige un precio especial; al vencer, el precio vuelve al normal. | M | 08/03 |
| RF-PRE-06 | El administrador puede crear combos (entrada + pochoclos + bebida) a un precio fijo configurable. | M | 03/03 |
| RF-PRE-07 | Los combos se muestran destacados en la pantalla de compra. | B | 03/03 |

### 5.7 Candy bar (CAN)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-CAN-01 | ABM de productos del candy bar. | M | 30/01 |
| RF-CAN-02 | ABM de categorías de productos. | M | 30/01 |
| RF-CAN-03 | Los productos se compran junto con la entrada. | M | 30/01 |
| RF-CAN-04 | Los productos se retiran presentando el mismo QR de la compra. | M | 30/01 |

### 5.8 Código QR y validación (QR)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-QR-01 | Cada compra genera un código QR único. | A | 01/01, 30/01 |
| RF-QR-02 | El empleado valida la entrada escaneando el QR con la cámara. | A | 06/02 |
| RF-QR-03 | El empleado puede ingresar el código manualmente si el lector no funciona. | A | 06/02 |
| RF-QR-04 | Al validarse la entrada, el QR deja de ser válido para el ingreso a la sala. | A | 06/02 |
| RF-QR-05 | Al entregarse los productos del candy bar, el QR deja de ser válido para esa entrega. | A | 06/02 |
| RF-QR-06 | Un intento de validar un código ya utilizado, inexistente o de una compra cancelada debe ser rechazado con un mensaje claro. | A | derivado |

### 5.9 Reseñas (RES)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-RES-01 | El usuario puede calificar una película con estrellas. | M | 16/01 |
| RF-RES-02 | El usuario puede dejar un comentario corto. | M | 16/01 |
| RF-RES-03 | Las reseñas se pueden consultar **antes** de comprar la entrada. | M | 16/01 |
| RF-RES-04 | Cada película muestra su puntuación promedio. | M | 16/01 |

### 5.10 Catálogo y página principal (CAT)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-CAT-01 | La página principal muestra primero las **3 películas más vendidas**. | M | 16/01 |
| RF-CAT-02 | El listado de películas incluye un buscador. | M | 16/01 |
| RF-CAT-03 | El buscador permite filtrar por género. | M | 16/01 |
| RF-CAT-04 | Existe una sección **"Próximamente"** con los estrenos de las próximas semanas. | M | 08/03 |
| RF-CAT-05 | El usuario puede activar una alerta para ser notificado cuando las entradas de un estreno salgan a la venta. | B | 08/03 |
| RF-CAT-06 | El detalle de una película muestra su información, sus reseñas, su promedio y sus funciones disponibles. | A | derivado |

### 5.11 Fidelización (FID)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-FID-01 | Cada compra de un cliente registrado acumula **1 punto por peso gastado**. | M | 03/03 |
| RF-FID-02 | Los puntos se canjean por entradas gratis o por productos del candy bar. | M | 03/03 |
| RF-FID-03 | El administrador configura cuántos puntos cuesta cada recompensa. | M | 03/03 |
| RF-FID-04 | El perfil muestra los puntos acumulados. | M | 03/03 |
| RF-FID-05 | El perfil muestra el historial de canjes. | M | 03/03 |
| RF-FID-06 | Los puntos no pueden transferirse entre usuarios. | M | 03/03 |
| RF-FID-07 | Sección **"Mis películas"**: historial visual de lo que el usuario vio, con pósters, fechas y su propia calificación. | B | 08/03 |

### 5.12 Administración y reportes (ADM)

| ID | Requerimiento | Prio | Origen |
|---|---|:--:|:--:|
| RF-ADM-01 | Reporte de facturación por día. | M | 28/02 |
| RF-ADM-02 | Reporte de cantidad de entradas vendidas. | M | 28/02 |
| RF-ADM-03 | Exportación del reporte de facturación a PDF. | B | 10/03 |
| RF-ADM-04 | Exportación del reporte de facturación a Excel. | B | 10/03 |
| RF-ADM-05 | Gráfico de películas más vistas por semana. | B | 10/03 |
| RF-ADM-06 | Gráfico de películas más vistas por mes. | B | 10/03 |
| RF-ADM-07 | Indicador del producto del candy bar más vendido. | B | 10/03 |
| RF-ADM-08 | **Log de actividad**: registro de quién creó una función, quién modificó un precio y quién validó un QR, con fecha y hora. | M | 10/03 |

---

## 6. Reglas de negocio críticas

Son las reglas que definen la corrección del sistema. **Todas deben validarse en el servidor
(Supabase)**, no únicamente en la interfaz: una validación que vive sólo en Angular se
saltea desde el navegador.

**RN-01 — No superposición de funciones.**
Dos funciones nunca pueden ocupar la misma sala en horarios que se solapen.
*Criterio de aceptación:* al intentar crear una función que se superpone con otra existente
en la sala candidata, el sistema la rechaza o asigna otra sala libre.

**RN-02 — Margen entre funciones.**
El inicio de una función debe ser posterior en **30 minutos o más** al fin de la función
anterior en esa sala. El fin se calcula como *hora de inicio + duración de la película*.
*Criterio de aceptación:* dada una función de 18:00 con una película de 120 minutos, la
siguiente función en esa sala no puede comenzar antes de las 20:30.

**RN-03 — Asignación automática de sala.**
El administrador nunca elige la sala: indica película, días y horario, y el sistema
selecciona una sala que cumpla RN-01 y RN-02. Si no hay ninguna, informa el conflicto.

**RN-04 — Unicidad de butaca vendida.**
Una butaca de una función no puede pertenecer a dos compras confirmadas.
*Criterio de aceptación:* ante dos compras simultáneas de la misma butaca, exactamente una
se confirma y la otra recibe un error claro. Se resuelve con una restricción de unicidad en
la base de datos, no con una comprobación previa en el cliente.

**RN-05 — Restricción de edad.**
Un usuario cuya edad, calculada a la fecha de la función, sea menor a la restricción de la
película no puede completar la compra. Toda entrada de una película restringida se emite
con la leyenda de que debe concurrir acompañado por un adulto.

**RN-06 — Invalidación del QR.**
El QR de una compra tiene dos usos independientes: ingreso a la sala y retiro de productos
del candy bar. Cada uno se consume una única vez; una vez consumido, el sistema rechaza
nuevos intentos sobre ese mismo concepto.

**RN-07 — Ventana de cancelación.**
Una compra sólo puede cancelarse hasta 2 horas antes del inicio de la función. La
cancelación genera crédito por el monto abonado, libera las butacas y revierte los puntos
otorgados por esa compra.

**RN-08 — Acumulación de puntos.**
Sólo los clientes registrados acumulan puntos, a razón de 1 punto por peso efectivamente
gastado. Los puntos no son transferibles y su canje descuenta el saldo de forma atómica
(no puede canjearse dos veces el mismo saldo).

**RN-09 — Vigencia de la preventa.**
El precio de preventa rige únicamente dentro de la ventana configurada. Fuera de ella se
aplica el precio normal, sin intervención manual.

**RN-10 — Cupón de primera compra.**
El cupón de bienvenida se aplica una sola vez por cliente y sólo si no registra compras
anteriores confirmadas.

---

## 7. Requerimientos no funcionales

| ID | Requerimiento |
|---|---|
| RNF-01 | Desarrollado en **Angular 22** con componentes standalone, aplicando las buenas prácticas trabajadas en clase. |
| RNF-02 | **Supabase** como backend: autenticación, base de datos, almacenamiento de imágenes y actualizaciones en tiempo real. |
| RNF-03 | La aplicación debe ser una **PWA** instalable. |
| RNF-04 | Debe estar **desplegada y accesible mediante una URL pública** sobre HTTPS. |
| RNF-05 | El código debe estar publicado en GitHub, con un **README que documente la arquitectura y las decisiones técnicas**. |
| RNF-06 | **Identidad visual propia y trabajada**, no una plantilla por defecto. |
| RNF-07 | Diseño **responsive**: el flujo completo de compra debe poder realizarse desde un teléfono. |
| RNF-08 | La carga de **fechas y horas** debe resolverse con selectores usables, evitando listas desplegables extensas que obliguen a hacer scroll (pedido expreso del cliente). |
| RNF-09 | Las interfaces deben ser fáciles de navegar y comprender tanto para clientes como para empleados. |
| RNF-10 | El acceso a los datos debe protegerse con **RLS en Supabase**: ocultar opciones en la interfaz no constituye un control de seguridad. |
| RNF-11 | La aplicación debe contemplar estados de carga y de error en cada operación contra el servidor. |

---

## 8. Supuestos

Decisiones tomadas ante información no especificada en los correos. Se documentan para su
validación con la cátedra y para sostenerlas en la defensa oral.

1. **Fila accesible.** Se interpreta que las filas J y K se retiran y en su lugar queda **una única fila** de 14 butacas accesibles, resultando en 19 filas por sala.
2. **QR con dos consumos.** Se modela un único código por compra con dos estados de validación independientes (entrada y candy bar), ya que el cliente pide un mismo QR para ambos usos pero exige que deje de funcionar al utilizarse.
3. **Precios.** Los correos no fijan importes. El precio base se define por función (según formato e idioma), con un recargo configurable para butacas VIP.
4. **Compra anónima.** Se solicita únicamente un correo electrónico para enviar el PDF, y una declaración de fecha de nacimiento cuando la película tiene restricción de edad.
5. **Cancelación.** Libera las butacas, revierte los puntos otorgados y no admite cancelaciones parciales.
6. **Pago.** Se simula, sin integración con una pasadera real; el crédito y los cupones se aplican sobre ese cálculo.
7. **"Próximamente".** Comprende las películas cuya fecha de estreno es posterior a la fecha actual.
8. **Películas más vendidas.** El ranking de la portada se calcula sobre las entradas vendidas de los últimos 30 días.

## 9. Consultas pendientes con la cátedra

1. ¿La eliminación de las filas J y K deja **una** fila accesible o **dos**? ¿Qué letra la identifica?
2. ¿La interpretación del QR con dos validaciones independientes es la esperada?
3. ¿Qué datos mínimos deben solicitarse en una compra anónima y cómo debe verificarse la edad en ese caso?
4. Las notificaciones de "Próximamente", ¿deben ser notificaciones push de la PWA o alcanza con un aviso por correo?
5. ¿Los puntos deben poder combinarse con dinero en una misma compra, o el canje es total?
6. ¿La cancelación de una compra debe revertir los puntos otorgados?

---

## 10. Matriz de trazabilidad

| Correo | Contenido | Requerimientos |
|---|---|---|
| 01/01 | Sistema base: salas, butacas, funciones, películas, registro, cupón, compra anónima, PDF con QR | SAL-02/03, PEL-01/04, FUN-01/02/03/06, USR-01/03, COM-01/05, PRE-01, QR-01 |
| 16/01 (a) | Reseñas, promedio, 3 más vendidas, buscador | RES-01/02/03/04, CAT-01/02 |
| 16/01 (b) | Filtro por género; varios géneros por película | PEL-02, CAT-03 |
| 30/01 | Cupón configurable, cupones por segmento, candy bar, retiro con el mismo QR | PRE-02/03, CAN-01/02/03/04, QR-01 |
| 06/02 | Roles admin y empleado, validación por QR, código manual, invalidación, asignación automática de salas | SAL-01/07, USR-04/05, FUN-01/04/05, QR-02/03/04/05 |
| 12/02 | Restricción de edad, fila accesible, butacas en tiempo real, resaltado visual | PEL-03, SAL-04/06, COM-02/06/07 |
| 28/02 | Usabilidad, selección de fecha y hora, reporte de facturación diaria | RNF-08/09, ADM-01/02 |
| 03/03 | Fidelización por puntos, recompensas configurables, historial, combos | FID-01…06, PRE-06/07 |
| 08/03 | Próximamente, alertas, preventa, "Mis películas" | CAT-04/05, PEL-05/06, PRE-05, FID-07 |
| 10/03 | Cancelación con crédito, butacas VIP, exportaciones, gráficos, log de actividad | COM-08/09/10/11, SAL-05, PRE-04, ADM-03…08 |

---

## 11. Plan de entregas propuesto

| Etapa | Contenido | Requerimientos |
|---|---|---|
| 1 | Modelo de datos y seguridad en Supabase | Base de RN-01 a RN-10 |
| 2 | Autenticación, roles, ruteo e identidad visual | USR-01…05, RNF-01/02/06 |
| 3 | Administración de cartelera: películas, salas y funciones con asignación automática | PEL-01…05, SAL-01…07, FUN-01…07 |
| 4 | Catálogo público: portada, buscador, detalle y reseñas | CAT-01…06, RES-01…04 |
| 5 | Compra: mapa de butacas en tiempo real, precios, promociones, candy y emisión del PDF con QR | COM-01…12, PRE-01…07, CAN-01…04, QR-01 |
| 6 | Validación de QR por el empleado | QR-02…06 |
| 7 | Perfil del cliente: puntos, canjes, crédito, cancelación y "Mis películas" | FID-01…07, COM-09…11 |
| 8 | Reportes, gráficos, exportaciones y log de actividad | ADM-01…08 |
| 9 | PWA, despliegue, README y preparación de la defensa | RNF-03/04/05 |

El camino crítico es **1 → 3 → 5**: sin modelo de datos no hay funciones, y sin funciones no
hay nada que vender. Reseñas, fidelización y reportes son módulos satélite que pueden
desarrollarse en paralelo una vez que la compra funciona.
