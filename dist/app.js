// Define the product data (as per the problem description)
const products = {
    VS5: {
        code: "VS5",
        packs: [
            { size: 5, price: 8.99 },
            { size: 3, price: 6.99 },
        ],
    },
    MB11: {
        code: "MB11",
        packs: [
            { size: 8, price: 24.95 },
            { size: 5, price: 16.95 },
            { size: 2, price: 9.95 },
        ],
    },
    CF: {
        code: "CF",
        packs: [
            { size: 9, price: 16.99 },
            { size: 5, price: 9.95 },
            { size: 3, price: 5.95 },
        ],
    },
};
// Function to calculate the minimal number of packs and total cost for a given product and quantity
const calculateOrderCost = (quantity, product) => {
    // Sort the packs by size in descending order (larger packs first)
    product.packs.sort((a, b) => b.size - a.size);
    let remainingQuantity = quantity;
    const packBreakdown = [];
    let totalCost = 0;
    // Loop through the available pack sizes and calculate the minimal pack breakdown
    for (const pack of product.packs) {
        const packCount = Math.floor(remainingQuantity / pack.size);
        if (packCount > 0) {
            packBreakdown.push({ size: pack.size, count: packCount });
            totalCost += packCount * pack.price;
            remainingQuantity -= packCount * pack.size;
        }
    }
    // If remaining quantity is not zero, we can't fulfill the order (but this shouldn't happen as per the problem statement)
    if (remainingQuantity > 0) {
        throw new Error(`Cannot fulfill the order for ${quantity} items of ${product.code}`);
    }
    // Format the output string
    let result = `${quantity} ${product.code} $${totalCost.toFixed(2)}`;
    for (const { size, count } of packBreakdown) {
        // Manually find the price for the pack size
        let packPrice = 0;
        for (const pack of product.packs) {
            if (pack.size === size) {
                packPrice = pack.price;
                break;
            }
        }
        result += `\n${count} x ${size} $${(count * packPrice).toFixed(2)}`;
    }
    return result;
};
// Function to process the input orders and output the result
function processOrders(orders) {
    orders.forEach((order) => {
        const [quantityStr, productCode] = order.split(" ");
        const quantity = parseInt(quantityStr);
        const product = products[productCode];
        if (!product) {
            console.error(`Product with code ${productCode} not found.`);
            return;
        }
        const result = calculateOrderCost(quantity, product);
        console.log(result);
    });
}
// Example input to test the function
const orders = ["10 VS5", "13 CF"];
console.log('in the app file');
// Process the orders and print the results
processOrders(orders);
