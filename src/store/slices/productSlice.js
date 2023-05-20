import { createSlice } from "@reduxjs/toolkit";
import ProductService from "@/service/Product.service";

import removeObjectWithId from "@/utils/removeObjectWithId";
import updateProductObjectWithId from "@/utils/updateProductObjectWithId";

const initialState = {
  products: [],
  isLoading: null,
  error: null,
};

export const productSelector = (state) => state.product;

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    start(state) {
      state.isLoading = true;
    },
    // TODO: error yönetimi için backend den hata mesajı döndürülecek
    fail(state) {
      state.error = true;
      state.isLoading = false;
    },
    getProductsSuccess(state, { payload }) {
      state.products = payload.products;
      state.isLoading = false;
    },
    addProductSuccess(state, { payload }) {
      state.products.push(payload.product);
      state.isLoading = false;
    },
    editProductSuccess(state, { payload }) {
      state.products = updateProductObjectWithId(
        state.products,
        payload.product.id,
        payload.product.product_name,
        payload.product.product_explanation,
        payload.product.photo1,
        payload.product.photo2,
        payload.product.photo3,
        payload.product.product_price,
        payload.product.brand_id,
        payload.product.category_id,
        payload.product.brands,
        payload.product.category
      );
      state.isLoading = false;
    },
    deleteProductSuccess(state, { payload }) {
      state.products = removeObjectWithId(state.products, payload.product.id);
      state.isLoading = false;
    },
  },
});

export const {
  start,
  fail,
  getProductsSuccess,
  addProductSuccess,
  editProductSuccess,
  deleteProductSuccess,
} = productSlice.actions;

// reducers
export default productSlice.reducer;

export const getProductsWithCategoryAndBrand = () => async (dispatch) => {
  dispatch(start());
  try {
    const response = await ProductService.getProductsWithCategoryAndBrand();
    dispatch(getProductsSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};

export const getProducts = () => async (dispatch) => {
  dispatch(start());
  try {
    const response = await ProductService.getProducts();
    dispatch(getProductsSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};

export const addProduct =
  (
    product_name,
    product_explanation,
    photo1,
    photo2,
    photo3,
    product_price,
    brand_id,
    category_id
  ) =>
  async (dispatch) => {
    dispatch(start());
    try {
      const response = await ProductService.addProduct(
        product_name,
        product_explanation,
        photo1,
        photo2,
        photo3,
        product_price,
        brand_id,
        category_id
      );
      dispatch(addProductSuccess(response));
    } catch (error) {
      dispatch(fail());
    }
  };

export const editProduct =
  (
    product_id,
    product_name,
    product_explanation,
    photo1,
    photo2,
    photo3,

    product_price,
    brand_id,
    category_id
  ) =>
  async (dispatch) => {
    dispatch(start());
    try {
      const response = await ProductService.editProduct(
        product_id,
        product_name,
        product_explanation,
        photo1,
        photo2,
        photo3,
        product_price,
        brand_id,
        category_id
      );

      dispatch(editProductSuccess(response));
    } catch (error) {
      console.log(error);
      dispatch(fail());
    }
  };

export const deleteProduct = (product_id) => async (dispatch) => {
  dispatch(start());
  try {
    const response = await ProductService.deleteProduct(product_id);
    dispatch(deleteProductSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};
