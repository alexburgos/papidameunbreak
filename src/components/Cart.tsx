import { useState } from "react";
import { useCart, Money } from "@shopify/hydrogen-react";
import { isShopifyConfigured } from "#/lib/shopify";
import "./Cart.css";

export function Cart() {
  if (!isShopifyConfigured()) {
    return (
      <span className="cart-toggle" aria-disabled="true">
        cart unavailable
      </span>
    );
  }

  return <CartInner />;
}

function CartInner() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const lines = cart.lines ?? [];

  return (
    <div className="cart">
      <button
        className="cart-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        cart ({cart.totalQuantity ?? 0})
      </button>
      {open && (
        <aside className="cart-drawer" role="dialog" aria-label="Shopping cart">
          {lines.length === 0 ? (
            <p className="cart-empty">your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-lines">
                {lines.map((line) => (
                  <li key={line?.id} className="cart-line">
                    <span>
                      {line?.merchandise?.product?.title} × {line?.quantity}
                    </span>
                    <button onClick={() => line?.id && cart.linesRemove([line.id])}>
                      remove
                    </button>
                  </li>
                ))}
              </ul>
              {cart.cost?.subtotalAmount && (
                <p className="cart-subtotal">
                  <Money data={cart.cost.subtotalAmount} />
                </p>
              )}
              <a className="buy-btn checkout-btn" href={cart.checkoutUrl}>
                checkout
              </a>
            </>
          )}
        </aside>
      )}
    </div>
  );
}
