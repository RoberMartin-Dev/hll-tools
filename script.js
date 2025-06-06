/* [250H] Farkas */

let currentData = [];
let currentSort = {
    column: 'ratio',
    direction: 'desc'
};

const background = document.getElementById('background');

// Cambiar sección según hash
function handleHashChange() {
    const hash = window.location.hash || '#home';

    // Ocultar todas las secciones
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('log-section').style.display = 'none';
    document.getElementById('arty-section').style.display = 'none';

    // Mostrar la sección según hash
    if (hash === '#log') {
        document.getElementById('log-section').style.display = 'block';
    } else if (hash === '#arty') {
        document.getElementById('arty-section').style.display = 'block';
    } else {
        document.getElementById('home-section').style.display = 'block';
    }
}

// Embers
function createEmber() {
    const ember = document.createElement('div');
    ember.classList.add('ember');
    ember.style.left = `${Math.random() * window.innerWidth}px`;
    ember.style.top = `${window.innerHeight}px`;
    background.appendChild(ember);
    setTimeout(() => ember.remove(), 3000);
}

setInterval(createEmber, 100);
window.addEventListener('resize', () => {
    const embers = document.querySelectorAll('.ember');
    embers.forEach(ember => ember.remove());
});

// LOG PROCESSOR
function sanitizeInput(text) {
    return text.replace(/<[^>]*>?/gm, '');
}

function processLogs() {
    let logText = document.getElementById('logInput').value.trim();
    if (!logText) return null;

    logText = sanitizeInput(logText);

    const stats = {};
    const killPattern = /^\[\s*[\d:.]+\s+(?:min|sec|hours)\s+\(\d+\)\]\s+KILL:\s+([^\(]+)\([^)]+\)\s+->\s+([^\(]+)\([^)]+\)\s+with\s+.*/i;

    logText.split('\n').forEach(line => {
        const match = line.match(killPattern);
        if (!match) return;

        const killer = match[1].trim();
        const victim = match[2].trim();

        stats[killer] = stats[killer] || { kills: 0, deaths: 0 };
        stats[killer].kills += 1;

        stats[victim] = stats[victim] || { kills: 0, deaths: 0 };
        stats[victim].deaths += 1;
    });

    return Object.entries(stats).map(([player, data]) => ({
        player,
        kills: data.kills,
        deaths: data.deaths,
        ratio: data.deaths === 0 ? data.kills : (data.kills / data.deaths).toFixed(2)
    }));
}

function renderTable(data) {
    const container = document.getElementById('tableContainer');
    container.innerHTML = ''; // Limpiamos el contenedor

    if (!data.length) {
        container.innerHTML = '<p class="no-data">No valid kill data found</p>';
        return;
    }

    // Creamos la tabla
    const table = document.createElement('table');
    const headers = ['Jugador', 'Kills', 'Deaths', 'Ratio'];

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.addEventListener('click', () => sortTable(header.toLowerCase()));
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.player}</td>
            <td>${item.kills}</td>
            <td>${item.deaths}</td>
            <td>${item.ratio}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // ✅ Envolver la tabla en un .table-container
    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    wrapper.appendChild(table);

    // Insertamos el wrapper en lugar de la tabla directamente
    container.appendChild(wrapper);
}

function sortTable(column) {
    document.querySelectorAll('#tableContainer th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });

    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = (column === 'player') ? 'asc' : 'desc';
    }

    const activeHeader = document.querySelector(`#tableContainer th:nth-child(${getColumnIndex(column)})`);
    if (activeHeader) activeHeader.classList.add(`sort-${currentSort.direction}`);

    currentData.sort((a, b) => {
        const valA = a[column];
        const valB = b[column];

        if (column === 'ratio' || column === 'kills' || column === 'deaths') {
            const numA = parseFloat(valA);
            const numB = parseFloat(valB);
            return currentSort.direction === 'asc' ? numA - numB : numB - numA;
        }

        return currentSort.direction === 'asc' 
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
    });

    renderTable([...currentData]);
}

function getColumnIndex(column) {
    const headers = ['player', 'kills', 'deaths', 'ratio'];
    return headers.indexOf(column) + 1;
}

document.getElementById('generatePdf').addEventListener('click', function() {
    if (!currentData.length) {
        const status = document.getElementById('status');
        status.textContent = '⚠️ Copy your log first';
        return;
    }

    const doc = new jspdf.jsPDF();
    doc.autoTable({
        head: [['Jugador', 'Kills', 'Deaths', 'Ratio']],
        body: currentData.map(item => [item.player, item.kills, item.deaths, item.ratio]),
        theme: 'striped',
        styles: { fontSize: 12, cellPadding: 1.5 },
        headStyles: { fillColor: [76, 175, 80] }
    });

    // Footer centrado PDF
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text('@ [250H] Farkas', doc.internal.pageSize.width / 2, pageHeight - 10, { align: 'center' });

    doc.save('estadisticas_hll.pdf');
    document.getElementById('status').textContent = '✅ PDF generated successfully!';
});

// Generar tabla del log processor
document.getElementById('generateTable').addEventListener('click', function() {
    currentData = processLogs();
    if (!currentData || !currentData.length) {
        document.getElementById('status').textContent = '⚠️ No valid kill data found';
        return;
    }

    currentSort = { column: 'ratio', direction: 'desc' };
    currentData.sort((a, b) => b.ratio - a.ratio);

    renderTable(currentData);
    document.getElementById('status').textContent = '📊 Order by K, D or Ratio';

    // Ratio ordenado descendente como valor inicial
    const ratioTh = document.querySelector('#tableContainer th:nth-child(4)');
    if (ratioTh) ratioTh.classList.add('sort-desc');
});

// ARTILLERY CALCULATOR
const xMin = 100;
const xMax = 1600;

class DistanceError extends Error {
    constructor() {
        super(`⚠️ Out range`);
        this.name = "DistanceError";
    }
}

const options = {
    "URSS": {
        m: -0.2136691176,
        b: 1141.7215,
    },
    "US/Ger": {
        m: -0.237035714285714,
        b: 1001.46547619048,
    },
    "UK": {
        m: -0.1773,
        b: 550.69,
    },
};

function validateInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 4);
    }
}

let currentResult = null;

function showResult() {
    const distanceInput = document.getElementById('distance');
    const artilleryType = document.getElementById('artilleryType').value;

    try {
        const distance = parseInt(distanceInput.value);
        const result = calculateArtillery(distance, options[artilleryType]);
        document.getElementById('resultDisplay').textContent = `Resultado: ${result}m`;
        currentResult = { distance, result, faction: artilleryType };
    } catch (error) {
        document.getElementById('resultDisplay').textContent = error.message;
        currentResult = null;
    }
}

function saveResult() {
    const resultDisplay = document.getElementById('resultDisplay');

    if (!currentResult) {
        resultDisplay.textContent = '⚠️ No valid data found';
        return;
    }

    const newResult = { ...currentResult };
    savedResults.push(newResult);
    updateTable();
    localStorage.setItem('artilleryResults', JSON.stringify(savedResults));
    currentResult = null;

    // No borramos el resultDisplay aquí, para mantener visible el último cálculo
    resultDisplay.style.color = 'white'; // restaurar color por si fue cambiado antes
}

function calculateArtillery(x, { m, b }) {
    if (x >= xMin && x <= xMax) {
        return Math.round(m * x + b);
    } else {
        throw new DistanceError();
    }
}

const savedResults = JSON.parse(localStorage.getItem('artilleryResults')) || [];

function deleteRow(index) {
    savedResults.splice(index, 1);
    updateTable();
    localStorage.setItem('artilleryResults', JSON.stringify(savedResults));
}

function updateTable() {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '';

    savedResults.forEach((result, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.distance}m</td>
            <td>${result.result}m</td>
            <td>${result.faction}</td>
            <td>
                <button class="delete-btn" onclick="deleteRow(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// INICIALIZACIÓN
window.addEventListener('hashchange', handleHashChange);
document.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
    updateTable();
});
