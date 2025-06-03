/*async function loadRecipes() {
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

    const pattern = recipe.pattern || ['   ', '   ', '   '];
    
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
        for (let i = 0; i < tr.children.length - 1; i++)
            tr.appendChild(document.createElement('td'));
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
loadRecipes();*/
async function loadRecipes() {
    try {
        const response = await fetch('/assets/recipes/index.json');
        const files = await response.json();

        const recipes = await Promise.all(files.map(async file => {
            try {
                const res = await fetch(`/assets/recipes/${file}`);
                return await res.json();
            } catch (e) {
                console.error(`Failed to load recipe: ${file}`, e);
                return null;
            }
        }));

        recipes.filter(Boolean).forEach(renderRecipe);
    } catch (e) {
        console.error("Failed to load index.json", e);
    }
}

function renderRecipe(recipe) {
    const container = document.createElement('div');
    container.className = 'recipe';

    const grid = document.createElement('div');
    grid.className = 'recipe-grid';

    const result = document.createElement('div');
    result.className = 'recipe-result';

    const table = document.createElement('table');

    // Initialize 3x3 empty grid
    const gridItems = Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => null)
    );

    if (recipe.type === "minecraft:crafting_shaped") {
        let pattern = recipe.pattern || [];
        const key = recipe.key || {};

        // In order to make all the recipes 3x3 even when not in .json file
        while (pattern.length < 3) pattern.push('');
        pattern = pattern.map(row => (row + '   ').slice(0, 3));

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const symbol = pattern[row][col];
                if (symbol && key[symbol]) {
                    gridItems[row][col] = key[symbol];
                }
            }
        }

    } else if (recipe.type === "minecraft:crafting_shapeless") {
        const ingredients = recipe.ingredients || [];

        for (let i = 0; i < Math.min(ingredients.length, 9); i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            gridItems[row][col] = ingredients[i];
        }
    }

    gridItems.forEach(rowItems => {
        const tr = document.createElement('tr');
        rowItems.forEach(entry => {
            const td = document.createElement('td');
            /*if (entry) {
                const itemPath = entry.item || entry.tag;
                if (itemPath) {
                    const img = document.createElement('img');
                    img.src = `/assets/static/item/${itemPath.replace(':', '_')}.png`;
                    img.alt = itemPath;
                    td.appendChild(img);
                }
            }*/
            // Adding tooltip
            if (entry) {
                const itemPath = entry.item || entry.tag;
                if (itemPath) {
                    const img = document.createElement('img');
                    img.className = 'items';
                    img.src = `/assets/static/item/${itemPath.replace(':', '_')}.png`;
                    img.alt = itemPath;
                    img.title = itemPath; // Tooltip part done
                    td.appendChild(img);
                }
            }
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    grid.appendChild(table);

    // Different style
    /*if (recipe.result?.item) {
    const resultItem = recipe.result.item.replace(':', '_');
    const count = recipe.result.count || 1;
    result.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-left: 40px; color:#9ea5fd;">
            <img src="/assets/static/item/${resultItem}.png" alt="${resultItem}">
            <div style="font-weight: bold;">${count}x ${recipe.result.item}</div>
        </div>
    `;
    }*/
    if (recipe.result?.item) {
    const resultItem = recipe.result.item.replace(':', '_');
    const count = recipe.result.count || 1;

    result.innerHTML = `
        <div style="position: relative; display: inline-block; margin-left: 40px;">
            <img class="items" src="/assets/static/item/${resultItem}.png" alt="${resultItem}" title="${recipe.result.item}">
            <div style="
                position: absolute;
                bottom: 2px;
                right: 2px;
                color: white;
                font-weight: bold;
                text-shadow: 1px 1px 2px black;
                font-size: 16px;
                pointer-events: none;
            ">${count > 1 ? count : ''}</div>
        </div>
    `;
}

    container.appendChild(grid);
    container.appendChild(result);
    document.getElementById('recipes').appendChild(container);
}

loadRecipes();