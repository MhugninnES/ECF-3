async function getData(){
    const response = await fetch("assets/data/recette.json");
    const recettes = await response.json();   

    console.log(recettes);
    renderData(recettes.recipes);
}

async function renderData(recettes){
    const container = document.getElementById('recipesContainer');
    
    recettes.map(recette => {
        let article = document.createElement('article');
        article.classList.add('recipe-card');
        
        article.innerHTML = `
            <h2>${recette.name}</h2>
            <p><strong>Nombre de personnes :</strong>${recette.servings}</p>
            <ul>
                ${recette.ingredients.map(ingredient => `
                    <li>${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''} ${ingredient.ingredient}</li>
                `).join('')}
            </ul>
        `
        container.appendChild(article);
    })
}

getData();