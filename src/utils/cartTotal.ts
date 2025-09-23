/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartData } from "@/types/productTypes";

export const getAmounts = (cartData: CartData): number[] => {
    const amount: any[] = [];
    if (Array.isArray(cartData?.data)) {
        cartData.data.map((item) => {
            if (item.productId && typeof item.productId.price === 'number') {
                amount.push(item.productId.price * item.quantity);
            }
        });
    }
    return amount;
}

export const cartTotalAmount = (prices: number[]): number => {
    return prices.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
}

//


