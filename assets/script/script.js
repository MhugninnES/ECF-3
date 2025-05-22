async function getData(){
    const response = await fetch("assets/data/recette.json");
    const recettes = await response.json();   

    renderData(recettes.recipes);
    research(recettes.recipes);
}

async function renderData(recettes){
    const container = document.getElementById('recipesContainer');
    container.innerHTML = "";

    // if(recettes === 1){
    //     container.classList.add('single-grid');
    // }else(recette >)
    
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

async function research(recettes){
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', () => {
        const researchValue = searchInput.value.toLowerCase();
        const filteredRecettes = recettes.filter(recette => recette.name.toLowerCase().includes(researchValue));

        renderData(filteredRecettes);
        console.log(researchValue);
    })

}

getData();