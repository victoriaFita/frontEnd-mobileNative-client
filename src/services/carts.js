import api from '../plugins/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

class CartService {
    async getLoggedUserId() {
        const userId = await AsyncStorage.getItem('userId');
        return userId;
    }

    async getCartByUserId(userId) {
        const response = await api.get(`/carts/?user=${userId}`);
        return response.data;
    }

    async createCart(userId) {
        const response = await api.post('/carts/', { user: userId });
        return response.data;
    }

    async addItemToCart(cartId, equipmentId, quantity = 1) {
        const response = await api.post('/cart-items/', {
            cart: cartId,
            equipment: equipmentId,
            quantity: quantity
        });
        return response.data;
    }

    async removeItemFromCart(itemId) {
        const response = await api.delete(`/cart-items/${itemId}/`);
        return response.data;
    }

    async clearCart(cartId) {
        const response = await api.delete(`/carts/${cartId}/`);
        return response.data;
    }

    async addToCart(equipmentId, quantity = 1) {
        const userId = await this.getLoggedUserId();
        let cart = await this.getCartByUserId(userId);

        if (!cart || cart.length === 0) {
            cart = await this.createCart(userId);
        }

        return await this.addItemToCart(cart.id, equipmentId, quantity);
    }
    
    async clearUserCart() {
        const userId = await this.getLoggedUserId();
        const cart = await this.getCartByUserId(userId);
        if (cart && cart.length > 0) {
            await this.clearCart(cart[0].id);
        }
    }
    
}

export default new CartService();
