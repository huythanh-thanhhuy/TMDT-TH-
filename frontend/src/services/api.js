import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Categories API
export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const addCategory = async (category_name, category_slug, parent_id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories`, {
            category_name,
            category_slug,
            parent_id: parent_id || null
        });
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

// Products API
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProductPrice = async (productId, priceData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/products/${productId}/price`,
            priceData
        );
        return response.data;
    } catch (error) {
        console.error('Error updating product price:', error);
        throw error;
    }
};
