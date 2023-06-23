import React, { useState } from 'react';
import { data } from '../data';

const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [routine, setRoutine] = useState([]);
  const [routineDuration, setRoutineDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const onAddProduct = (product) => {
    const updatedRoutine = [...routine, product];
    setRoutine(updatedRoutine);

    const updatedDuration = routineDuration + product.duration;
    setRoutineDuration(updatedDuration);

    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price);
    setCountProducts(countProducts + 1);
    setAllProducts([...allProducts, product]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((product) =>
    product.nameEjercicio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-items">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar ejercicios"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {filteredData.map((product) => (
        <div className="item" key={product.id}>
          <figure>
            <img src={product.img} alt={product.nameEjercicio} />
          </figure>
          <div className="info-product">
            <h2>{product.nameEjercicio}</h2>
            <p>{product.descripcion}</p>
            <p className="price">Repeticiones: {product.repeticiones}</p>
            <button onClick={() => onAddProduct(product)}>
              Añadir a la rutina
            </button>
          </div>
        </div>
      ))}

      <div className="routine-summary">
        <h3>Rutina de Ejercicios</h3>
        {routine.length > 0 ? (
          <div>
            <p>Duración Total: {routineDuration} min</p>
            <ul>
              {routine.map((exercise) => (
                <li key={exercise.id}>
                  {exercise.nameEjercicio} - Repeticiones: {exercise.repeticiones}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No se ha añadido ningún ejercicio a la rutina.</p>
        )}
      </div>

      <style jsx>{`
        .search-bar {
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
