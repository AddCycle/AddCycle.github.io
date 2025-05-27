console.log("hello")
async function loadRecipe(name) {
    const res = await fetch(`/assets/recipes/${name}.json`);
    const data = await res.json();
    renderRecipe(data);
}

function renderRecipe(recipe) {
    const grid = document.getElementById('recipe-grid');
    grid.innerHTML = '';

    const pattern = recipe.pattern || ['   ', '   ', '  '];
    const key = recipe.key || {};
    
    const table = document.createElement('table');

    pattern.forEach(row => {
        const tr = document.createElement('tr');
        [...row].forEach(symbol => {
            const td = document.createElement('td');
            const entry = key[symbol];
            if (entry) {
                const itemPath = entry.item || entry.tag;
                const img = document.createElement('img');
                img.src = `/assets/static/item/${itemPath.replace(':', '_')}.png`;
                img.alt = itemPath;
                td.appendChild(img);
            }
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    grid.appendChild(table);
}

// DEBUG : FOR NOW WORKING
// loadRecipe("oxonium_block");
// loadRecipe("allemanite_block");
loadRecipe("allemanite_necklace")