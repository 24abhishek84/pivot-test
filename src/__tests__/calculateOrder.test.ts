import { printOrderDetails } from "../app/calculateOrder";

describe('App tests', () => {
    it('Test the first test', () => {
        const result = printOrderDetails(5, 'VS5');
        expect(result).toContain('5 VS5 $8.99');
        expect(result).toContain('1 x 5 $8.99');
    })
});