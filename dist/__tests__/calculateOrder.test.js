"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateOrder_1 = require("../app/calculateOrder");
describe('App tests', () => {
    it('Test the first test', () => {
        const result = (0, calculateOrder_1.printOrderDetails)(5, 'VS5');
        expect(result).toBe('\n 2 x 5 $17.98');
    });
});
//# sourceMappingURL=calculateOrder.test.js.map