import { Pack, PackCombination } from "./types";
// src/app/calculateOrder.ts
// This module calculates the optimal pack combination for a given product and quantity.

export const products: { [key: string]: Pack[] } = {
  "VS5": [
    { size: 3, price: 6.99 },
    { size: 5, price: 8.99 }
  ],
  "MB11": [
    { size: 2, price: 9.95 },
    { size: 5, price: 16.95 },
    { size: 8, price: 24.95 }
  ],
  "CF": [
    { size: 3, price: 5.95 },
    { size: 5, price: 9.95 },
    { size: 9, price: 16.99 }
  ]
};

export const getPackDetails = (productCode: string): Pack[] => {
  const packs = products[productCode];
  if (!packs) {
    throw new Error(`Invalid product code: ${productCode}`);
  }
  return packs;
};

export const findMinimalPackCombination = (quantity: number, packs: Pack[]): PackCombination[] | null => {
  // Initialize a DP array where dp[i] will store the minimal cost for i items
  const dp: (number | null)[] = Array(quantity + 1).fill(null);
  const combination: (Pack | null)[] = Array(quantity + 1).fill(null);

  dp[0] = 0;  // Default: cost for 0 items is 0

  // Loop through all quantities from 1 to `quantity`
  for (let i = 1; i <= quantity; i++) {
    for (let pack of packs) {
      if (i - pack.size >= 0 && dp[i - pack.size] !== null) {
        const newCost = dp[i - pack.size]! + pack.price;
        if (dp[i] === null || newCost < dp[i]!) {
          dp[i] = newCost;
          combination[i] = pack;
        }
      }
    }
  }

  // If dp[quantity] is still null, it means we cannot fulfill the order
  if (dp[quantity] === null) {
    return null;
  }

  // Reconstruct the optimal pack combination from the `combination` array
  const result: PackCombination[] = [];
  let remainingQuantity = quantity;

  while (remainingQuantity > 0) {
    const pack = combination[remainingQuantity]!;
    const existingPack = result.find((p) => p.size === pack.size);
    if (existingPack) {
      existingPack.count++;
    } else {
      result.push({ size: pack.size, price: pack.price, count: 1 });
    }
    remainingQuantity -= pack.size;
  }

  return result;
}

export const printOrderDetails = (quantity: number, productCode: string): string => {
  const packs = getPackDetails(productCode);
  const combination = findMinimalPackCombination(quantity, packs);

  if (combination === null) {
    console.log(`Unable to fulfill the order for ${quantity} ${productCode}`);
    return;
  }

  // Calculate total cost
  let totalCost = 0;
  combination.forEach(pack => {
    totalCost += pack.price * pack.count;
  });

  // Print the order details
  let output = `${quantity} ${productCode} $${totalCost.toFixed(2)}`;
  combination.forEach(pack => {
    output += `\n${pack.count} x ${pack.size} $${pack.price.toFixed(2)}`;
  });

  console.log(output);
  return output;
}
