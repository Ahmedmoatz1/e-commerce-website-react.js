import React, { useContext } from "react";
import { CartContext } from "../../components/context/Cartcontext";
import { MdDelete } from "react-icons/md";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="checkout">
        <div className="ordersummary">
          <h1>Order summary</h1>
          <p className="empty-cart">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="ordersummary">
        <h1>Order summary</h1>

        <div className="items">
          {cartItems.map((item) => (
            <div className="item_cart" key={item.id}>
              <img src={item.thumbnail || item.images?.[0]} alt={item.title} />

              <div className="content">
                <h1>{item.title}</h1>
                <p className="price_item">
                  ${item.price} × {item.quantity} = <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </p>

                <div className="quantity_control">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>

              <button
                className="delete_item"
                onClick={() => removeFromCart(item.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>

        <div className="bottom_summary">
          <div className="shop_table">
            <p>Total</p>
            <span className="total_checkout">${cartTotal.toFixed(2)}</span>
          </div>

          <div className="button_div">
            <button>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;