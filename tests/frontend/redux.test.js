import * as actions from '../../app/reducers/products.jsx';
import * as types from '../../app/action-types/products.jsx';

describe('actions', () => {
    it('should create an action to add a product', () => {
        const product = "Kitten Mittens";
        const expectedAction = {
            type: types.ADD_PRODUCT,
            product
        }
        expect(actions.addProduct(product)).toEqual(expectedAction);
    })
})