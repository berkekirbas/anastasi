import { createSlice } from "@reduxjs/toolkit";
import CategoryService from "@/service/Category.service";
import removeObjectWithId from "@/utils/removeObjectWithId";
import updateCategoryObjectWithId from "@/utils/updateCategoryObjectWithId";

const initialState = {
  categories: [],
  isLoading: null,
  error: null,
};

export const categorySelector = (state) => state.category;

export const categorySlice = createSlice({
  name: "category",
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
    getCategoriesSuccess(state, { payload }) {
      state.categories = payload.categories;
      state.isLoading = false;
    },
    addCategorySuccess(state, { payload }) {
      state.categories.push(payload.category);
      state.isLoading = false;
    },
    editCategorySuccess(state, { payload }) {
      state.categories = updateCategoryObjectWithId(
        state.categories,
        payload.category.id,
        payload.category.category_name,
        payload.category.category_explanation,
        payload.category.category_photo,
        payload.category.brand_id,
        payload.category.brands
      );
      state.isLoading = false;
    },
    deleteCategorySuccess(state, { payload }) {
      state.categories = removeObjectWithId(
        state.categories,
        payload.category.id
      );
      state.isLoading = false;
    },
  },
});

export const {
  start,
  fail,
  getCategoriesSuccess,
  addCategorySuccess,
  editCategorySuccess,
  deleteCategorySuccess,
} = categorySlice.actions;

// reducers
export default categorySlice.reducer;

export const getCategoriesWithBrand = () => async (dispatch) => {
  dispatch(start());
  try {
    const response = await CategoryService.getCategoriesWithBrand();
    dispatch(getCategoriesSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch(start());
  try {
    const response = await CategoryService.getCategories();
    dispatch(getCategoriesSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};

export const addCategory =
  (category_name, category_explanation, category_photo, brand_id) =>
  async (dispatch) => {
    dispatch(start());
    try {
      const response = await CategoryService.addCategory(
        category_name,
        category_explanation,
        category_photo,
        brand_id
      );
      dispatch(addCategorySuccess(response));
    } catch (error) {
      dispatch(fail());
    }
  };

export const editCategory =
  (
    category_id,
    category_name,
    category_photo,
    category_explanation,
    brand_id
  ) =>
  async (dispatch) => {
    dispatch(start());
    try {
      const response = await CategoryService.editCategory(
        category_id,
        category_name,
        category_explanation,
        category_photo,
        brand_id
      );

      dispatch(editCategorySuccess(response));
    } catch (error) {
      console.log(error);
      dispatch(fail());
    }
  };

export const deleteCategory = (category_id) => async (dispatch) => {
  dispatch(start());
  try {
    const response = await CategoryService.deleteCategory(category_id);
    dispatch(deleteCategorySuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};
