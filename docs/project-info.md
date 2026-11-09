# Información del proyecto

## Qué es
Una página web con un juego de lógica propio, al estilo Murdoku: el jugador coloca a los sospechosos y a la víctima en una cuadrícula dividida en habitaciones y con objetos, siguiendo unas pistas, y descubre quién es el asesino. El tablero va de 6×6 a 12×12, y el tamaño lo define cada caso.

## Para quién
Una sola persona que quiere jugar casos de lógica de deducción, sin necesidad de instalar nada ni crear una cuenta.

## Reglas del juego
1. En un tablero de N×N hay N personajes: N−1 sospechosos y la víctima.
2. Un personaje por fila y por columna.
3. Nadie puede ocupar una casilla con un objeto que bloquea.
4. Se cumplen todas las pistas del caso.
5. **Regla del asesino:** exactamente un sospechoso comparte habitación con la víctima, y ese es el asesino. Si la víctima está sola en su habitación, o con dos o más sospechosos, la colocación no es válida. Esta regla se muestra en pantalla y la usan tanto «Comprobar» como el solver.

## Funciones
- Cargar casos de cualquier tamaño entre 6×6 y 12×12; los personajes salen de cada caso.
- Elegir caso en un desplegable y reiniciar el caso actual con un botón.
- Mostrar el tablero con las habitaciones y los objetos que defina cada caso, la lista de pistas, la regla del asesino y los personajes.
- Tachar desde el inicio las casillas con objetos que bloquean (mesas, camas, plantas, televisión, etc.). Cada caso indica qué objetos bloquean y cuáles no, y un objeto puede ocupar una o varias casillas contiguas.
- Colocar un personaje con clic: se elige el personaje y luego la casilla. Otro clic sobre él lo quita. Mover un personaje libera su casilla anterior.
- Rechazar con un aviso breve colocar un personaje en una casilla tachada o en una ocupada por otro personaje (sin intercambiar).
- Al colocar un personaje, atenuar con una marca el resto de su fila y de su columna. Es solo ayuda visual: esas casillas se pueden usar. Al quitarlo se recuperan, salvo las que otro personaje siga descartando.
- Marcar en rojo, con un icono o patrón además del color, a los personajes que repiten fila o columna, en cuanto se produce.
- Tipos de pista: habitación concreta, «junto a» un objeto, fila o columna concreta, fila superior a la de otro personaje, misma habitación que otro personaje y «a solas» en su habitación.
  - «Junto a»: casilla contigua en horizontal o vertical a cualquier casilla del objeto, en la misma habitación, y nunca encima del objeto (aunque no bloquee).
  - «Fila superior»: estrictamente más arriba (número de fila menor).
  - «A solas»: nadie más en su habitación, víctima incluida. Es distinto de la regla del asesino.
- Comprobar la solución evaluando las reglas del juego (no comparando con una solución guardada). Orden de los avisos: faltan personajes, conflictos, pistas sin cumplir, regla del asesino; si todo se cumple, se revela al asesino.
- Adaptar el tamaño de las casillas (variable CSS) al tamaño del tablero y de la pantalla. En el 12×12 en móvil las casillas serán de unos 30 px, con desplazamiento o zoom.
- Accesibilidad mínima: el rojo nunca es la única señal, soporte básico de teclado y etiquetas ARIA. La accesibilidad completa queda fuera de alcance.
- Incluir casos con solución única, comprobada por un solver de backtracking.

## Fuera de alcance
- Cuentas de usuario, guardado de partidas y clasificaciones.
- Generador automático de casos dentro de la página (los casos se preparan aparte con una herramienta offline y se incluyen en los archivos).
- Tableros menores de 6×6 o mayores de 12×12.
- Reglas especiales de escena más allá de las indicadas (por ejemplo, roles de guardia o hábitats).
- Multijugador, sonido y animaciones complejas.
- Accesibilidad completa.
- Reproducir casos, personajes o ilustraciones de Murdoku (los casos son originales).

## Tecnología
Una página que se abre con doble clic en el navegador, sin servidor ni build ni dependencias: `index.html`, `styles.css` y scripts clásicos (lógica, casos e interfaz) en archivos de menos de 500 líneas. Para desarrollo y pruebas se usan Node (`node:test`), Playwright y ESLint, que la app no necesita para funcionar.

## Datos y claves
Los datos de cada caso (tamaño, habitaciones, objetos y sus casillas, si cada objeto bloquea o no, personajes, pistas y solución) van en archivos de la propia app. No se guarda nada del usuario. No necesita claves ni archivo `.env`.

## Cómo se prueba
Caso de 6×6, con filas 1–6 de arriba abajo y columnas 1–6 de izquierda a derecha. Las casillas marcadas con [X] contienen un objeto que bloquea y quedan tachadas: nadie puede ocuparlas.

Distribución de habitaciones y objetos:

| Fila | Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 |
|---|---|---|---|---|---|---|
| 1 | Cocina | Cocina | Salón | Salón [X] Chimenea | Terraza | Terraza |
| 2 | Cocina | Cocina | Salón [X] Sofá | Salón | Terraza | Terraza [X] Maceta |
| 3 | Biblioteca | Biblioteca | Salón | Garaje | Garaje | Terraza |
| 4 | Biblioteca [X] Estantería | Biblioteca | Despacho | Despacho | Garaje | Garaje |
| 5 | Biblioteca | Despacho | Despacho [X] Escritorio | Despacho | Garaje | Garaje [X] Coche |
| 6 | Biblioteca | Despacho | Despacho | Despacho | Garaje | Garaje |

Personajes: Ana, Bruno, Clara, Darío, Elena y la Víctima.

Pistas:
1. Darío y Elena están en la misma habitación.
2. Bruno está junto al coche.
3. Bruno está en una fila superior a la de Darío.
4. Ana está en una fila superior a la de Clara.
5. La víctima está en la última columna.

Con estas 5 pistas hay 17 colocaciones válidas (comprobado por fuerza bruta). Solo una cumple además la regla del asesino, así que la solución es única con las 5 pistas más esa regla.

Resultado esperado: Ana en (1,3), Clara en (2,4), Elena en (3,2), Víctima en (4,6), Bruno en (5,5) y Darío en (6,1). **El asesino es Bruno**, porque es el único que queda con la víctima en su habitación (Garaje).

Comprobaciones adicionales:
- Al colocar a dos personajes en la misma fila o columna, la página debe marcarlos en rojo con icono.
- Al colocar a un personaje, se atenúan el resto de su fila y de su columna; al quitarlo se recuperan.
- Al intentar colocar a un personaje en una casilla tachada o en una ocupada, la página debe rechazarlo con un aviso.
- Cualquier colocación completa distinta de la solución debe mostrar "Solución incorrecta".
- «Junto a»: con Bruno en (4,6) o (6,6) o (5,5) se cumple la pista del coche; con Bruno encima del coche (5,6) no.
- Un segundo caso pequeño (por preparar) debe usar «a solas», «habitación concreta», «fila o columna concreta» y un objeto que no bloquee.
- La página debe cargar y dibujar correctamente un caso de 12×12 con solución única (por preparar y verificar con la herramienta offline).
