# HLL Tools

A simple multi-tool web app for Hell Let Loose players, featuring:

- **Artillery Calculator**: Calculate artillery distances and get precise aiming adjustments.
- **Log Processor**: Analyze in-game kill logs to generate player statistics (kills, deaths, ratio).
- **PDF Export**: Export processed logs statistics as a formatted PDF report.
- **Single Page App**: Navigate between tools with URL hash routing.
- **Responsive Design**: Works smoothly on desktops, tablets, and mobile devices.
- **Local Storage**: Save artillery results locally for later reference.

## Usage

1. Open the app in a modern browser.
2. Use the main menu to switch between the artillery calculator and log processor.
3. Input data and get instant feedback with user-friendly messages.
4. Export log statistics as PDF when needed.

OR, go to the [online demo](https://robermartin-dev.github.io/hll-tools/).

### Sample Game Log

Here is an example of a game log (test log) that you can input into the Log Processor section:

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
