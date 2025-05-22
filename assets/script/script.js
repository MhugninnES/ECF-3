async function getData(){
    const response = await fetch("assets/data/recette.json");
    const recettes = await response.json();
    console.log(recettes);
}

getData();