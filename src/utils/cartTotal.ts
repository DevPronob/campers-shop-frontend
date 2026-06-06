


export const getAmounts = (cartData: any): number[] => {
  const amount: number[] = [];

  if (Array.isArray(cartData?.data?.items)) {
    cartData.data.items.forEach((item: any) => {
      if (item.productId && typeof item.productId.price === 'number') {
        amount.push(item.productId.price * item.quantity);
      }
    });
  }

  console.log(amount, 'amount');
  return amount;
};
export const cartTotalAmount = (prices: number[]): number => {
    return prices.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
}


