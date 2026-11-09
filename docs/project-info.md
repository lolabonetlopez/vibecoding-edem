# Información del proyecto

## Qué es
Una página web con un juego de lógica propio, al estilo Murdoku: el jugador coloca a los sospechosos y a la víctima en una cuadrícula dividida en habitaciones y con objetos, siguiendo unas pistas, y descubre quién es el asesino. El tablero va de 6×6 a 12×12, y el tamaño lo define cada caso.

## Para quién
Una sola persona que quiere jugar casos de lógica de deducción, sin necesidad de instalar nada ni crear una cuenta.

## Funciones
- Cargar casos de cualquier tamaño entre 6×6 y 12×12. En un tablero de N×N hay N personajes: N−1 sospechosos y la víctima.
- Mostrar el tablero con las habitaciones y los objetos que defina cada caso, la lista de pistas y los personajes.
- Tachar desde el inicio las casillas con objetos que no se pueden ocupar (mesas, camas, plantas, televisión, etc.). Cada caso indica qué objetos bloquean la casilla y cuáles no, y un objeto puede ocupar una o varias casillas.
- Permitir colocar y quitar personajes en las casillas libres.
- Aplicar la regla base: un personaje por fila y por columna.
- Marcar en rojo los conflictos (fila o columna repetida, o casilla tachada) en cuanto se producen.
- Admitir estos tipos de pista: habitación concreta, "junto a" un objeto (casilla contigua en horizontal o vertical y en la misma habitación), fila o columna concreta, fila superior a la de otro personaje, misma habitación que otro personaje y "a solas" en su habitación.
- Comprobar la solución y revelar al asesino: es el único personaje que queda a solas con la víctima en la misma habitación.
- Adaptar el tamaño de las casillas al tamaño del tablero y de la pantalla.
- Incluir al menos un caso inicial con solución única, comprobado por fuerza bruta.

## Fuera de alcance
- Cuentas de usuario, guardado de partidas y clasificaciones.
- Generador automático de casos nuevos dentro de la página (los casos se preparan aparte y se incluyen en el archivo).
- Tableros menores de 6×6 o mayores de 12×12.
- Reglas especiales de escena más allá de las indicadas (por ejemplo, roles de guardia o hábitats).
- Multijugador, sonido y animaciones complejas.
- Reproducir casos, personajes o ilustraciones de Murdoku (los casos son originales).

## Tecnología
Un único archivo HTML con CSS y JavaScript, sin dependencias, que se abre directamente en el navegador (en local).

## Datos y claves
Los datos de cada caso (tamaño, habitaciones, objetos y sus casillas, si cada objeto bloquea o no, pistas y solución) van incluidos en el propio archivo. No se guarda nada del usuario. No necesita claves ni archivo `.env`.

## Cómo se prueba
Caso de 6×6, con filas 1–6 de arriba abajo y columnas 1–6 de izquierda a derecha. Las casillas marcadas con [X] contienen un objeto y quedan tachadas: nadie puede ocuparlas.

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

Resultado esperado (solución única): Ana en (1,3), Clara en (2,4), Elena en (3,2), Víctima en (4,6), Bruno en (5,5) y Darío en (6,1). **El asesino es Bruno**, porque es el único que queda a solas con la víctima en su habitación (Garaje).

Comprobaciones adicionales:
- Al colocar a dos personajes en la misma fila o columna, la página debe marcar el conflicto.
- Al intentar colocar a un personaje en una casilla tachada, la página debe rechazarlo.
- Cualquier colocación distinta de la solución debe mostrar "Solución incorrecta".
- La página debe cargar y dibujar correctamente un caso de 12×12 (pendiente de preparar y verificar un caso de ese tamaño).

---

<details>
<summary>Ejemplo de referencia: calculadora de hipoteca (no es tu proyecto)</summary>

**Qué es:** una página que calcula la cuota mensual de una hipoteca.

**Para quién:** personas que están comparando hipotecas antes de ir al banco.

**Funciones:**
- Pedir importe, interés anual y años.
- Mostrar la cuota mensual.
- Avisar si falta un dato o no es válido.

**Fuera de alcance:** cuentas de usuario, guardar simulaciones y ofertas de bancos reales.

**Tecnología:** una página HTML con JavaScript que se abre en el navegador.

**Datos y claves:** solo los datos que escribe el usuario, que no se guardan. No necesita claves.

**Cómo se prueba:** 200.000 € al 3 % a 30 años = 843 €/mes.

</details>
