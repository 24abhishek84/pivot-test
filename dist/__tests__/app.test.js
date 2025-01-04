"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
describe('App tests', () => {
    it('Test the first test', () => {
        const result = (0, app_1.printOrderDetails)(5, 'VS5');
        expect(result).toBe('\n 2 x 5 $17.98');
    });
});
//# sourceMappingURL=app.test.js.map