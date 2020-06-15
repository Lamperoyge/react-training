export const addItemToCart = (cartItems, item) => {
  const existingCartitems = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );
  if (existingCartitems) {
    return cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...item, quantity: 1 }];
};
