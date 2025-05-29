import { Products } from "./Products";
export function ProductsGrid({ products, loadPage }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Products key={product.id} product={product} loadPage={loadPage} />
        );
      })}
    </div>
  );
}
