import { printOrderDetails } from "../app/calculateOrder";

    describe('App tests', () => {
        it.each`
            quantity    |   productCode |   expectedCalculations 
            ${5}        |   ${'VS5'}    |   ${['5 VS5 $8.99', '1 x 5 $8.99']}
            ${14}       |   ${'MB11'}   |   ${['14 MB11 $8.99', '2 x 2 $9.95', '2 x 5 $16.95']}
            ${13}       |   ${'CF'}     |   ${['13 CF $25.85', '1 x 3 $5.95', '2 x 5 $9.95']}
            ${1}        |   ${'VS5'}    |   ${undefined}
        `('Should print calculated result when quantity is $quantity and product is $productCode', ({quantity, productCode, expectedCalculations}) => {
            const result = printOrderDetails(quantity, productCode);
            if(result) {
                expectedCalculations.forEach((calc: [string], index: number)  => {
                    expect(result).toContain(calc[index]);
                })
            } else {
                expect(result).toBe(expectedCalculations);
            }
        });
});