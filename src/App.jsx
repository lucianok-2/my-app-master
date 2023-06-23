import React, { useState } from 'react';
import { Header } from './components/Header';
import ProductList from './components/ProductList';
import { data } from './data';

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [routines, setRoutines] = useState([]);

  const addProduct = (routine) => {
    setRoutines([...routines, routine]);
  };

  const deleteRoutine = (index) => {
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
            <h3>{routine.name}</h3>
            <ul>
              {routine.exercises.map((exercise, index) => (
                <li key={index}>
                  {exercise.nameEjercicio} - Duración: {exercise.duracion} seg
                </li>
              ))}
            </ul>
            <p>Duración Total: {routine.duration} seg</p>
            <button onClick={() => deleteRoutine(index)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
