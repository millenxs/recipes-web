import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
	idCategory: string;
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
}

const Categories: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
		.then(response => {
			setCategories(response.data.categories);
			setLoading(false);
		})
		.catch(error => {
			console.error("Eero ao buscar categorias", error);
			setLoading(false);
		});
}, []);

	return (
		<div className="container mx-auto p-4 text-white">
		<h1 className="text-3xl font-bold text-center mb-8">Meal Categories</h1>
  
		{loading ? (
		  <div className="text-center text-lg">Loading...</div>
		) : (
		  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			{categories.map((category) => (
			  <div key={category.idCategory} className="rounded-lg shadow-lg overflow-hidden">
				<img
				  src={category.strCategoryThumb}
				  alt={category.strCategory}
				  className="w-full h-48 object-cover"
				/>
				<div className="p-4">
				  <h2 className="text-xl font-semibold mb-2">{category.strCategory}</h2>
				  <p className="text-sm text-gray-700">
					{category.strCategoryDescription.substring(0, 100)}...
				  </p>
				</div>
			  </div>
			))}
		  </div>
		)}
	  </div>
	);
};

export default Categories;