import React, { useState, useEffect, useCallback } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const Header = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  addProduct,
}) => {
  const [active, setActive] = useLocalStorage('active', false);

  const handleDeleteProduct = useCallback(
    (product) => {
      const updatedProducts = allProducts.filter((item) => item.id !== product.id);
      const productQuantity = product.quantity;

      setTotal((prevTotal) => prevTotal - product.duration * productQuantity);
      setCountProducts((prevCount) => prevCount - productQuantity);
      setAllProducts(updatedProducts);
    },
    [allProducts, setAllProducts, setTotal, setCountProducts]
  );

  const handleCleanCart = useCallback(() => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  }, [setAllProducts, setTotal, setCountProducts]);

  const handleCreateRoutine = useCallback(() => {
    if (allProducts.length > 0) {
      const newRoutine = {
        id: Date.now(),
        exercises: allProducts,
        duration: total,
        name: `Rutina ${allProducts[0].nameEjercicio}`,
      };
      addProduct(newRoutine);
      handleCleanCart();
    }
  }, [allProducts, total, addProduct, handleCleanCart]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedTotal = localStorage.getItem('total');
    const savedCountProducts = localStorage.getItem('countProducts');

    if (savedCartItems) {
      setAllProducts(JSON.parse(savedCartItems));
    }

    if (savedTotal) {
      setTotal(parseInt(savedTotal));
    }

    if (savedCountProducts) {
      setCountProducts(parseInt(savedCountProducts));
    }
  }, [setAllProducts, setTotal, setCountProducts]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(allProducts));
    localStorage.setItem('total', total.toString());
    localStorage.setItem('countProducts', countProducts.toString());
  }, [allProducts, total, countProducts]);

  return (
    <header>
      <h1 style={{ textAlign: 'center' }}>Rutinas de Ejercicios</h1>

      <div className="container-icon">
        <div
          className="container-cart-icon"
          onClick={() => setActive((prevActive) => !prevActive)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-cart"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M0 0h24v24H0z"
              fill="none"
            />
            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>

        <div
          className={`container-cart-products ${active ? '' : 'hidden-cart'}`}
        >
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <span className="titulo-producto-carrito">
                        {product.nameEjercicio}
                      </span>

                      <span className="repeticiones-producto-carrito">
                        Repeticiones: {product.repeticiones}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Duración Total:</h3>
                <span className="total-pagar">
                  {Math.floor(total / 60)} min {total % 60} seg
                </span>
              </div>

              <button className="btn-clear-all" onClick={handleCleanCart}>
                Limpiar Rutina
              </button>
              <button className="btn-crear" onClick={handleCreateRoutine}>
                Crear Rutina
              </button>
            </>
          ) : (
            <p className="cart-empty">Sin Rutina</p>
          )}
        </div>
      </div>
    </header>
  );
};
