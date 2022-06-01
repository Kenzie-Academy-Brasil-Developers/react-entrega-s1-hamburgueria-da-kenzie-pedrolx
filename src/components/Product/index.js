export function Product({ product, handleClick, inCart, deleteProduct }) {


  return (
    <div>
      <div key={product.id}>
        <figure>
          <img src={product.img} alt="product"></img>
        </figure>
        <figcaption>
          <div className="product-div-1">
            <h4>{product.name}</h4>
            <span>{product.category}</span>
          </div>

          <div className="product-div-2">
          {inCart ? (
              <button onClick={() => deleteProduct(product.id)}>
                Remover
              </button>
            ) : (
              <button onClick={() => handleClick(product.id)}>
                Adicionar
              </button>
            )}
            <p>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
            {inCart ? (<p>Qntd: {product.qtd}</p>) : (<></>)}

          </div>
        </figcaption>
      </div>
    </div>
  );
}
