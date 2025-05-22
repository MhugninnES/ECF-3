async function getData(){
    const response = await fetch("assets/data/recette.json");
    const recettes = await response.json();   

    renderData(recettes.recipes);
    research(recettes.recipes);
}

async function renderData(recettes){
    const container = document.getElementById('recipesContainer');
    container.innerHTML = "";
    
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
        article.addEventListener('click', () => {
            console.log(recette);
            modalDisplay(recette);
        })
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

async function modalDisplay(recette){
    const modal = document.getElementById('modal');
    modal.innerHTML='';

    modal.innerHTML = ` <a href="#" id="close-modal">&#x274C;</a>
        <div>
            <h2>${recette.name}</h2>
            <p><strong>Nombre de personnes :</strong>${recette.servings}</p>
            <ul>
                ${recette.ingredients.map(ingredient => `
                    <li>${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''} ${ingredient.ingredient}</li>
                `).join('')}
            </ul>
        </div>
        <div>
            <p>${recette.time}</p> 
            <p>${recette.appliance}</p>
            <p>${recette.description}</p>
            <ul>
                ${recette.ustensils.map(ustensil => `
                    <li>${ustensil}</li>
                `).join('')}
            </ul>
        </div>
        `

    closeModal();
    modal.classList.remove("modal-hide")
}

async function closeModal(){
    const close = document.getElementById("close-modal");
    const modal = document.getElementById('modal');

    close.addEventListener('click', () =>{

        modal.classList.add("modal-hide")
    })
}

getData();