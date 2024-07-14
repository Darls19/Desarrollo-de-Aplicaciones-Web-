document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mercado-libre-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const query = document.getElementById('mercado-libre-query').value;
      if (query) {
        fetchData(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`, 'MercadoLibre');
      }
    });
  });
  
  function fetchData(url, type) {
    console.log(`Fetching data from: ${url}`);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        displayData(data, type);
      })
      .catch(error => console.error('Error:', error));
  }
  
  function displayData(data, type) {
    const resultsDiv = document.getElementById('mercado-libre-results');
    resultsDiv.innerHTML = '';
  
    if (type === 'MercadoLibre') {
      if (data.results && data.results.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
      } else {
        data.results.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card col-md-4';
          const largestImage = item.pictures && item.pictures.length > 0 ? item.pictures[0].url.replace('-I.jpg', '-O.jpg') : item.thumbnail;
  
          card.innerHTML = `
            <img src="${largestImage}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">Precio: ${item.price} ${item.currency_id}</p>
              <p class="card-text">Condición: ${item.condition}</p>
              <a href="${item.permalink}" class="btn btn-primary" target="_blank">Ver producto</a>
            </div>
          `;
          resultsDiv.appendChild(card);
        });
      }
    }
  }
  
  