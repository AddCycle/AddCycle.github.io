console.log("hello")
async function loadRecipes() {
    const response = await fetch('/assets/recipes/index.json');
    const files = await response.json();

    for (const file of files) {
        const recipe = await fetch(`/assets/recipes/${file}`).then(r => r.json());
        renderRecipe(recipe);
    }
}

async function loadRecipe(name) {
    const res = await fetch(`/assets/recipes/${name}.json`);
    const data = await res.json();
    renderRecipe(data);
}

function renderRecipe(recipe) {
    const container = document.createElement('div');
    container.className = 'recipe';

    const grid = document.createElement('div');
    grid.className = 'recipe-grid';

    const result = document.createElement('div');
    result.className = 'recipe-result';

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

    if (recipe.result) {
        const resultItem = recipe.result.item.replace(':', '_');
        result.innerHTML = `
            <img src="/assets/static/item/${resultItem}.png" alt="${resultItem}" style="margin-left:40px">
            <!-- <div>${recipe.result.count || 1}x ${recipe.result.item}</div> -->
        `;
    }

    container.appendChild(grid);
    container.appendChild(result);

    document.getElementById('recipes').appendChild(container);
}

// DEBUG : FOR NOW WORKING
// loadRecipe("oxonium_block");
// loadRecipe("allemanite_block");
// loadRecipe("oxonium_furnace")
// loadRecipe("oxonium_necklace")
loadRecipes();