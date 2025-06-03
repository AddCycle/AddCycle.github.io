function loadItem(path) {
    const img = document.createElement('img');
    img.className = 'test';
    img.src = `/assets/static/item/${path.replace(':', '_')}.png`;
    img.alt = path;
    img.title = path;
    return img;
}

async function loadAllItems() {
    const response = await fetch('/assets/item_index.json');
    const items = await response.json();

    const container = document.createElement('div');
    container.className = 'item1';

    items.forEach(item => {
        container.appendChild(loadItem(item));
    });

    document.getElementById('item-list').appendChild(container);
}

loadAllItems();