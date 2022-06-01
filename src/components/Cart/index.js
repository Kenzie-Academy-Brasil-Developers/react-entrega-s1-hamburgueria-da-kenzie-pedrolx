import "./styles.css";
import { Product } from "../Product";

export function Cart({ currentSale, cartTotal, setCartTotal, deleteProduct, children }) {

  function calculateTotalPrice() {
    const value =
      currentSale.length > 0
        ? currentSale.reduce((pv, product) => {
            return (pv + (product.price * product.qtd));
          }, 0)
        : 0;
    return value;
  }

  return (
    <div className="cart">
      <header>
        <h2>Carrinhos de compras</h2>
      </header>

      <div className="cart-products">
        {currentSale.length > 0 ? (
          currentSale.map((product) => (
            <Product
              product={product}
              inCart={true}
              deleteProduct={deleteProduct}
              key={product.id}
            />
          ))
        ) : (
          <div className="default-cart-message">
            <h4>Sua sacola esta vazia</h4>
          </div>
        )}
      </div>

      <div className="cart-total">
        <div>
          <h3>Total</h3>
          <h4>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(calculateTotalPrice())}
          </h4>
        </div>
            {children}
      </div>
    </div>
  );
}
