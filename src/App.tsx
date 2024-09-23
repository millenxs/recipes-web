import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pagination/Home';
import Categories from './pagination/Categories'
import RecipeList from './pagination/RecipeList';
import RecipeDetails from './pagination/RecipeDetails';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
	<Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
		<Route path="/categorias" element={<Categories />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
