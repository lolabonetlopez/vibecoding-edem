# Plan

El agente trabaja una fase cada vez y marca las casillas al cerrarla.
Antes de cerrar cada fase: pruebas unitarias, e2e y linter sin errores, resultado enseñado y commit local (sin push).
Cada fase termina con algo que se puede probar abriendo la app y cabe en una sesión.

## Fase 0 · Esqueleto

**Objetivo:** una versión mínima que se abre y funciona.

**Tareas:**
- [x] `git init` (local, sin push) y revisar `.gitignore`.
- [x] Vaciar `.env.example` (la app no usa claves).
- [x] Crear `index.html`, `styles.css` y carpeta de scripts clásicos (sin build, sin dependencias en la app).
- [x] Montar las herramientas de desarrollo: `node:test` para la lógica, ESLint y Playwright. Decir antes cuál se instala y para qué, y avisar de que Playwright descarga navegadores (cientos de MB) y pedir permiso.
- [x] Definir el patrón para probar scripts clásicos en Node (`module.exports` condicional).
- [x] Mostrar una primera pantalla con el nombre de la app.

**Pruebas:**
- E2e: la app se abre desde `file://` y muestra su nombre.
- Unitaria de ejemplo que carga un script clásico en Node.

**Cómo lo compruebo:** abro `index.html` con doble clic y veo el nombre; las pruebas pasan.

**Hecho cuando:** la app se abre sin errores, se ve su nombre y todas las pruebas y el linter pasan.

## Fase 1 · Tablero 6×6 quieto

**Objetivo:** ver el tablero del caso de prueba, sin interacción.

**Tareas:**
- [ ] Esquema de caso solo del tablero: tamaño, habitaciones y objetos (casillas, si bloquean).
- [ ] Datos del caso 6×6 de `docs/project-info.md`.
- [ ] Dibujar la cuadrícula con habitaciones separadas, nombres de objetos y casillas bloqueantes tachadas.
- [ ] Tamaño de casilla como variable CSS `--cs`.

**Pruebas:**
- Unitaria: los datos son un 6×6 válido (N×N, cada casilla con habitación).
- E2e: 36 casillas y 6 tachadas.

**Cómo lo compruebo:** comparo la pantalla con la tabla de `project-info.md` (6 habitaciones; tachadas Chimenea, Sofá, Maceta, Estantería, Escritorio y Coche).

**Hecho cuando:** el tablero coincide con la tabla y las pruebas pasan.

## Fase 2 · Pistas, regla del asesino y solver

**Objetivo:** mostrar las pistas y la regla del asesino, y demostrar que el 6×6 tiene solución única.

**Tareas:**
- [ ] Ampliar el esquema del caso: personajes, pistas (tipo + parámetros) y solución.
- [ ] Validador de casos: habitaciones conexas, objetos de varias casillas contiguos, solución coherente con las reglas.
- [ ] Lógica de los tipos de pista: habitación concreta, junto a (contiguo en horizontal o vertical, misma habitación, nunca encima), fila o columna concreta, fila superior (estrictamente más arriba), misma habitación y a solas (víctima incluida).
- [ ] Regla del asesino: exactamente un sospechoso con la víctima en su habitación.
- [ ] Solver de backtracking que cuenta soluciones, y comando para ejecutarlo.
- [ ] Mostrar en pantalla la lista de pistas y la regla del asesino.

**Pruebas:**
- Unitarias: cada tipo de pista (casos que cumplen y no, incluido «junto a» encima del objeto y con objeto de varias casillas) y la regla del asesino (víctima sola, con uno, con dos o más).
- Solver: el 6×6 tiene exactamente 1 solución con las 5 pistas más la regla (17 sin la regla).
- E2e: las 5 pistas y la regla aparecen en pantalla.

**Cómo lo compruebo:** veo las pistas y la regla en la página y el comando imprime «1 solución».

**Hecho cuando:** pistas visibles, validador y solver con pruebas pasando.

## Fase 3 · Colocar y quitar

**Objetivo:** poner y quitar personajes con clic.

**Tareas:**
- [ ] Panel de personajes generado desde el caso (no nombres fijos).
- [ ] Elegir personaje y clic en casilla para colocar; otro clic lo quita; moverlo libera la anterior.
- [ ] Rechazar con aviso breve casillas tachadas y casillas ocupadas por otro personaje (sin intercambiar).
- [ ] Botón Reiniciar.

**Pruebas:**
- Unitarias: colocar, quitar, mover, rechazar tachada y ocupada, reiniciar.
- E2e: colocar y quitar a los seis; el Coche y una casilla ocupada se rechazan.

**Cómo lo compruebo:** coloco y quito a los seis, intento el Coche y una casilla ocupada, y reinicio.

**Hecho cuando:** todo lo anterior funciona y las pruebas pasan.

## Fase 4 · Descarte y conflictos

**Objetivo:** ayuda visual de fila/columna y conflictos en rojo.

**Tareas:**
- [ ] Al colocar, atenuar con marca el resto de su fila y columna (siguen siendo usables).
- [ ] Al quitar, recuperarlas salvo las que otro personaje siga descartando.
- [ ] Marcar en rojo con icono o patrón a quienes repiten fila o columna, al instante.
- [ ] Teclado básico y etiquetas ARIA en el tablero y el panel.

**Pruebas:**
- Unitarias: cálculo de casillas descartadas y de conflictos.
- E2e: Ana en (1,3) descarta fila 1 y columna 3; Bruno en la fila 1 deja a ambos en rojo con icono; se puede colocar y quitar con teclado.

**Cómo lo compruebo:** hago esas dos colocaciones y veo el descarte y el rojo con icono.

**Hecho cuando:** descarte, recuperación, conflictos y teclado funcionan con pruebas pasando.

## Fase 5 · Comprobar y revelar

**Objetivo:** comprobar la solución con las reglas y revelar al asesino.

**Tareas:**
- [ ] Botón «Comprobar» que usa la misma lógica de pistas y reglas que la Fase 2 (no una solución guardada).
- [ ] Orden de avisos: faltan personajes, conflictos, pistas sin cumplir, regla del asesino.
- [ ] Con todo correcto, revelar al asesino y explicar por qué.
- [ ] Cualquier colocación completa que no cumple muestra «Solución incorrecta».

**Pruebas:**
- Unitarias: cada aviso y el orden de prioridad.
- E2e: la solución de `project-info.md` revela a Bruno; intercambiar dos personajes muestra «Solución incorrecta».

**Cómo lo compruebo:** coloco la solución y sale Bruno; la cambio y sale «Solución incorrecta».

**Hecho cuando:** la solución correcta revela a Bruno y las demás dan el aviso adecuado.

## Fase 6 · Selector y segundo caso

**Objetivo:** varios casos seleccionables.

**Tareas:**
- [ ] Desplegable para elegir caso.
- [ ] Segundo caso pequeño con «a solas», «habitación concreta», «fila o columna concreta» y un objeto que no bloquea, con solución única comprobada por el solver y el validador.

**Pruebas:**
- Solver: cada caso incluido tiene exactamente 1 solución.
- E2e: cambiar de caso y resolverlo.

**Cómo lo compruebo:** cambio de caso en el desplegable y resuelvo el segundo.

**Hecho cuando:** ambos casos se pueden jugar y tienen solución única.

## Fase 7 · Herramienta offline de casos

**Objetivo:** poder preparar y verificar casos grandes sin escribirlos a ciegas.

**Tareas:**
- [ ] Comando que valida un caso, cuenta sus soluciones con el solver y avisa si no es único.
- [ ] Ayuda para preparar pistas: dada una colocación objetivo, proponer y filtrar pistas hasta lograr unicidad.
- [ ] Documentar el flujo para añadir un caso nuevo.

**Pruebas:**
- Unitarias: la herramienta acepta los casos 6×6 válidos y rechaza uno con 0 o más de 1 solución.

**Cómo lo compruebo:** ejecuto el comando sobre los casos existentes y sobre uno roto.

**Hecho cuando:** la herramienta valida los casos existentes y detecta los inválidos.

## Fase 8 · Adaptable y 12×12

**Objetivo:** tablero adaptable y un caso 12×12.

**Tareas:**
- [ ] Ajustar `--cs` al tamaño del tablero y de la pantalla.
- [ ] En móvil, casillas de unos 30 px con desplazamiento o zoom en el 12×12.
- [ ] Preparar un caso 12×12 (11 sospechosos y la víctima) con solución única usando la herramienta de la Fase 7.

**Pruebas:**
- E2e: el 12×12 carga y se dibuja completo; con ventana reducida las casillas se adaptan; se puede resolver.
- Solver: el 12×12 tiene exactamente 1 solución (backtracking, no fuerza bruta pura).

**Cómo lo compruebo:** abro el 12×12, reduzco la ventana y lo resuelvo.

**Hecho cuando:** el 12×12 se ve, se adapta y se resuelve, con solución única verificada.
