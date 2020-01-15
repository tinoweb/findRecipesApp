import React, {useEffect, useState} from 'react';
import './App.css';
import Recipes from './Recipes';

function App() {

  const APP_ID = "9a6ae68e";
  const APP_KEY = "e26963469251553c62a65ff4fd2c37c3";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updatSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" placeholder="Type the food" type="text" value={search} onChange={updatSearch}/>
        <button className="search-button" type="submit">
            Search 
        </button>
      </form>

      <div className="recipes">
      {recipes.map(recipe => (
        <Recipes 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>

    </div>
  );
}

export default App;
