function loadItems(path) {
    const elt = document.createElement('img');
    elt.className = 'test';
    elt.src = `/assets/static/item/${path.replace(':', '_')}.png`;
    return elt;
}

const container = document.createElement('div');
container.className = 'item1';

container.appendChild(loadItems("chaosmod:allemanite_necklace"));
container.appendChild(loadItems("chaosmod:oxonium_necklace"));
container.appendChild(loadItems("chaosmod:enderite_sword"));
document.getElementById('item-list').appendChild(container);