document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pokemon-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('pokemon-query').value.toLowerCase();
        fetchData(`https://pokeapi.co/api/v2/pokemon/${query}`, 'Pokemon');
    });
});

function fetchData(url, type) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayData(data, type))
        .catch(error => console.error('Error:', error));
}

function displayData(data, type) {
    const resultsDiv = document.getElementById('pokemon-results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (type === 'Pokemon') {
        const card = document.createElement('div');
        card.className = 'card col-md-4';
        card.innerHTML = `
            <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">Base Experience: ${data.base_experience}</p>
                <p class="card-text">Height: ${data.height}</p>
                <p class="card-text">Weight: ${data.weight}</p>
            </div>
        `;
        resultsDiv.appendChild(card);
    }
}
