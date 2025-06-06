:green_square: :scroll: ////////// Español ////////// :scroll: :green_square:  
# HLL Tools

Una sencilla aplicación web multi-herramienta para jugadores de Hell Let Loose, que incluye:

- **Calculadora de Artillería**: Calcula distancias de artillería y ofrece ajustes precisos para apuntar.
- **Procesador de Logs**: Analiza logs de muertes del juego para generar estadísticas de jugadores (kills, muertes, ratio).
- **Exportación a PDF**: Exporta las estadísticas procesadas en un informe PDF formateado.
- **Aplicación de Página Única**: Navega entre herramientas usando enrutamiento por hash en la URL.
- **Diseño Responsivo**: Funciona perfectamente en escritorio, tabletas y dispositivos móviles.
- **Almacenamiento Local**: Guarda resultados de artillería localmente para referencia posterior.

> [!NOTE]
> La calculadora de artillería no pide confirmación para borrar registros por cuestiones de velocidad (importante en competición).
> Log processor está pensado para sustituir los RCON vanilla o que requieren VPS, permitiendo obtener estadísticas básicas gratis.

## Uso

1. Abre la aplicación en un navegador moderno.
2. Usa el menú principal para cambiar entre la calculadora de artillería y el procesador de logs.
3. Introduce datos y recibe retroalimentación inmediata con mensajes fáciles de entender.
4. Exporta las estadísticas de logs en PDF cuando sea necesario.

O bien, accede a la [demo online](https://robermartin-dev.github.io/hll-tools/).

### Log de prueba

```
[1:29:41 hours (1741623210)] MATCH START ST MARIE DU MONT Warfare
[1:29:41 hours (1741623210)] CONNECTED Player1 (76561198819510473) 
[1:29:36 hours (1741623215)] TEAMSWITCH Player1 (None > Allies)
[1:29:12 hours (1741623239)] CONNECTED Player2 (76561198045478984) 
[1:29:07 hours (1741623244)] TEAMSWITCH Player2 (None > Axis)
[1:29:00 hours (1741623251)] CONNECTED Player3 (76561198015662142) 
[1:28:43 hours (1741623268)] TEAMSWITCH Player3 (None > Allies) 
[1:24:12 hours (1741623539)] KILL: Player2(Axis/76561198045478984) -> Player3(Allies/76561198015662142) with MP40 
[1:23:06 hours (1741623605)] KILL: Player3(Allies/76561198015662142) -> Player2(Axis/76561198045478984) with M1 GARAND
```

## Tecnologías

- HTML, CSS, JavaScript
- [jsPDF](https://github.com/parallax/jsPDF) para generación de PDF

## Licencia

MIT

RoberMartin-Dev.

:green_square: :scroll: ////////// English ////////// :scroll: :green_square:  
# HLL Tools

A simple multi-tool web app for Hell Let Loose players, featuring:

- **Artillery Calculator**: Calculate artillery distances and get precise aiming adjustments.
- **Log Processor**: Analyze in-game kill logs to generate player statistics (kills, deaths, ratio).
- **PDF Export**: Export processed logs statistics as a formatted PDF report.
- **Single Page App**: Navigate between tools with URL hash routing.
- **Responsive Design**: Works smoothly on desktops, tablets, and mobile devices.
- **Local Storage**: Save artillery results locally for later reference.

> [!NOTE]
> The artillery calculator skips confirmation prompts when deleting entries to maintain speed, which is crucial in competitive play.  
> The log processor is intended as an alternative to vanilla RCON tools or those requiring a VPS, enabling users to generate basic statistics at no cost.

## Usage

1. Open the app in a modern browser.
2. Use the main menu to switch between the artillery calculator and log processor.
3. Input data and get instant feedback with user-friendly messages.
4. Export log statistics as PDF when needed.

OR, go to the [online demo](https://robermartin-dev.github.io/hll-tools/).

### Sample Game Log

```
[1:29:41 hours (1741623210)] MATCH START ST MARIE DU MONT Warfare
[1:29:41 hours (1741623210)] CONNECTED Player1 (76561198819510473) 
[1:29:36 hours (1741623215)] TEAMSWITCH Player1 (None > Allies)
[1:29:12 hours (1741623239)] CONNECTED Player2 (76561198045478984) 
[1:29:07 hours (1741623244)] TEAMSWITCH Player2 (None > Axis)
[1:29:00 hours (1741623251)] CONNECTED Player3 (76561198015662142) 
[1:28:43 hours (1741623268)] TEAMSWITCH Player3 (None > Allies) 
[1:24:12 hours (1741623539)] KILL: Player2(Axis/76561198045478984) -> Player3(Allies/76561198015662142) with MP40 
[1:23:06 hours (1741623605)] KILL: Player3(Allies/76561198015662142) -> Player2(Axis/76561198045478984) with M1 GARAND
```

## Technologies

- HTML, CSS, JavaScript
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation

## License

MIT

RoberMartin-Dev.
