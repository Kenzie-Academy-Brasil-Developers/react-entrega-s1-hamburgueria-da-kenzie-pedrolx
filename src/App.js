import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./data/api";
import { ProductsList } from "./components/ProductsList";
import { Cart } from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSale, setCurrentSale] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    api
      .get()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  function showProducts(input) {
    const filteredProduct = products.filter(
      (product) =>
        product.name.toUpperCase().includes(input.toUpperCase()) ||
        product.category.toUpperCase().includes(input.toUpperCase())
    );
    setFilteredProducts(filteredProduct);
  }

  function handleClick(id) {
    const productInCart = currentSale.find((product) => product.id === id);
    if (productInCart) {
      const foundedProduct = currentSale.find((product) => product.id === id);
      foundedProduct.qtd += 1;
      setCurrentSale([...currentSale]);
      setCartTotal(currentSale);
    } else {
      const foundedProduct = products.find((product) => product.id === id);
      foundedProduct.qtd = 1;
      setCurrentSale([foundedProduct, ...currentSale]);
      setCartTotal(currentSale);
    }
  }

  function deleteProduct(id) {
    const productIndex = currentSale.findIndex((product) => product.id === id);
    if (currentSale[productIndex].qtd > 1) {
      currentSale[productIndex].qtd -= 1;
      setCurrentSale([...currentSale]);
      setCartTotal(currentSale);
    } else {
      const newProducts = currentSale.map((product) => product);
      newProducts.splice(productIndex, 1);
      setCurrentSale(newProducts);
    }
  }

  function removeAll() {
    setCurrentSale([]);
  }

  return (
    <div className="App">
      <header>
        <div className="header-logo">
          <h1>
            Burguer <span>Kenzie</span>
          </h1>
        </div>
        <div className="header-input-div">
          <input
            placeholder="Digitar Pesquisa"
            onChangeCapture={(e) => showProducts(e.target.value)}
          ></input>
          <button>Pesquisar</button>
        </div>
      </header>

      <div className="dashboard">
        <ProductsList
          products={products}
          handleClick={handleClick}
          filteredProducts={filteredProducts}
        />
        <Cart
          currentSale={currentSale}
          cartTotal={cartTotal}
          setCartTotal={setCartTotal}
          deleteProduct={deleteProduct}
          setCurrentSale={setCurrentSale}
        >
          <button onClick={removeAll}>Remover Todos</button>
        </Cart>
      </div>
    </div>
  );
}

export default App;
