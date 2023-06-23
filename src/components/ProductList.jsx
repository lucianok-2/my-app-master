import { data } from '../data';

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const onAddProduct = (product) => {
		if (allProducts.find((item) => item.id === product.id)) {
			const products = allProducts.map((item) =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	return (
		<div className='container-items'>
			{data.map((product) => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameEjercicio} />
					</figure>
					<div className='info-product'>
						<h2>{product.nameEjercicio}</h2>
						<p>{product.descripcion}</p>
						<p className='price'>Repeticiones :{product.repeticiones}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir a la rutina
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
