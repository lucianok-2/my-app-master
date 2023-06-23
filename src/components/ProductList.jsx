import React, { useState } from 'react';
import { data } from '../data';

const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
  addProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = data.filter((product) =>
    product.nameEjercicio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = selectedCategory
    ? filteredData.filter((product) => product.categoria === selectedCategory)
    : filteredData;

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes} min ${seconds} seg`;
  };

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.duracion);
      setCountProducts(countProducts + 1);
      return setAllProducts([...products]);
    }

    setTotal(total + product.duracion);
    setCountProducts(countProducts + 1);
    setAllProducts([...allProducts, product]);
  };

  

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar ejercicios"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todas las categorías</option>
          <option value="Cardio">Cardio</option>
          <option value="Piernas">Piernas</option>
          <option value="Core">Core</option>
          <option value="Espalda">Espalda</option>
        </select>
      </div>

      <div className="container-items">
        {sortedData.map((product) => (
          <div className="item" key={product.id}>
            <figure>
              <img src={product.img} alt={product.nameEjercicio} />
            </figure>
            <div className="info-product">
              <h2>{product.nameEjercicio}</h2>
              <p>{product.descripcion}</p>
              <p className="duration">Duración: {formatDuration(product.duracion)}</p>
              <p className="repetitions">Repeticiones: {product.repeticiones}</p>
              <button onClick={() => onAddProduct(product)}>Añadir a la rutina</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
        }

        .search-bar {
          text-align: center;
          margin-bottom: 20px;
        }

        .container-items {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
        }

        .item {
          border-radius: 10px;
        }

        .item:hover {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .item img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 10px 10px 0 0;
          transition: all 0.5s;
        }

        .item figure {
          overflow: hidden;
        }

        .item:hover img {
          transform: scale(1.2);
        }

        .info-product {
          padding: 15px 30px;
          line-height: 2;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
        }

        .duration,
        .repetitions {
          font-size: 18px;
          font-weight: 900;
        }

        .info-product button {
          border: none;
          background: none;
          background-color: #000;
          color: #fff;
          padding: 15px 10px;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .container-items {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .container-items {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;
