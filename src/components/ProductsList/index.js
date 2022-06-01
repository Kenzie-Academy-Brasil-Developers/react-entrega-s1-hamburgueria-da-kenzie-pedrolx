import "./styles.css";
import { Product } from "../Product";

export function ProductsList({ products, handleClick, filteredProducts }) {
  return (
    <div className="father-container">
      <ul className="container-products">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <Product product={product} handleClick={handleClick} 
              key={product.id}/>
            ))
          : products.map((product) => (
              <Product product={product} handleClick={handleClick} 
              key={product.id}/>
            ))}
      </ul>
    </div>
  );
}
