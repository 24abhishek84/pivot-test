import { findMinimalPackCombination, printOrderDetails, products } from "../app/calculateOrder";
import { PackCombination } from '../app/types';

describe('App tests', () => {
    it.each`
            quantity    |   productCode |   expectedCalculations 
            ${5}        |   ${'VS5'}    |   ${['5 VS5 $8.99', '1 x 5 $8.99']}
            ${14}       |   ${'MB11'}   |   ${['14 MB11 $8.99', '2 x 2 $9.95', '2 x 5 $16.95']}
            ${13}       |   ${'CF'}     |   ${['13 CF $25.85', '1 x 3 $5.95', '2 x 5 $9.95']}
            ${1}        |   ${'VS5'}    |   ${undefined}
        `('Should print calculated result when quantity is $quantity and product is $productCode', ({ quantity, productCode, expectedCalculations }) => {
        const result = printOrderDetails(quantity, productCode);
        if (result) {
            expectedCalculations.forEach((calc: [string], index: number) => {
                expect(result).toContain(calc[index]);
            })
        } else {
            expect(result).toBe(expectedCalculations);
        }
    });

    it('Should return minimum pack combination based on product and its quantity', () => {
        const mockPacks = products["VS5"];
        expect(mockPacks.length).toEqual(2);

        const result = findMinimalPackCombination(5, mockPacks) as PackCombination[];
        expect(result.length).toBe(1);
        expect(result[0].size).toBe(5);
        expect(result[0].count).toBe(1);
    });

    describe('Product combination with different quantities', () => {
        const mockPacks = products["VS5"];
        
        it('Should return 1 combination with size=5 and count=1 when quantity is 5', () => {
            expect(mockPacks.length).toEqual(2);
    
            const result = findMinimalPackCombination(5, mockPacks) as PackCombination[];
            expect(result.length).toBe(1);
            expect(result[0].size).toBe(5);
            expect(result[0].count).toBe(1);
        });
    
        it('Should return 1 combination with size=3 and count=3 when quantity is 9', () => {
            const mockPacks = products["VS5"];
            expect(mockPacks.length).toEqual(2);
    
            const result = findMinimalPackCombination(9, mockPacks) as PackCombination[];
            expect(result.length).toBe(1);
            expect(result[0].size).toBe(3);
            expect(result[0].count).toBe(3);
        });

        it('Should return 2 combinations when quantity is 8', () => {
            const result = findMinimalPackCombination(8, mockPacks) as PackCombination[];
            expect(result.length).toBe(2);
            expect(result[0].size).toBe(3);
            expect(result[0].count).toBe(1);

            expect(result[1].size).toBe(5);
            expect(result[1].count).toBe(1);
        });
    
        it('Should return null when product quantity does not match', () => {
            const mockPacks = products["VS5"];
            const result = findMinimalPackCombination(2, mockPacks);
            expect(result).toBe(null);
        });
    })
});