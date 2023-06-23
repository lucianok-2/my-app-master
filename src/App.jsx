import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import ProductList from './components/ProductList';
import './index.css';

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const savedRoutines = localStorage.getItem('routines');

    if (savedRoutines) {
      setRoutines(JSON.parse(savedRoutines));
    }
  }, []);

  useEffect(() => {
    if (routines.length > 0) {
      localStorage.setItem('routines', JSON.stringify(routines));
    } else {
      localStorage.removeItem('routines');
    }
  }, [routines]);

  const addProduct = (routine) => {
    setRoutines([...routines, routine]);
  };

  const removeProduct = (index) => {
    const updatedRoutines = [...routines];
    updatedRoutines.splice(index, 1);
    setRoutines(updatedRoutines);
  };

  return (
    <div className="App">
      <Header
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        setTotal={setTotal}
        addProduct={addProduct}
      />
      <ProductList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        total={total}
        setTotal={setTotal}
        addProduct={addProduct}
      />

      <div className="routines-container">
        {routines.map((routine, index) => (
          <div className="routine-card" key={index}>
            <img src="si.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{routine.name}</h5>
              <ul className="card-text">
                {routine.exercises.map((exercise, index) => (
                  <li key={index}>
                    {exercise.nameEjercicio} - Duración: {exercise.duracion} seg
                  </li>
                ))}
              </ul>
              <p className="card-text">Duración Total: {routine.duration} seg</p>
              <button className="btn btn-danger" onClick={() => removeProduct(index)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
