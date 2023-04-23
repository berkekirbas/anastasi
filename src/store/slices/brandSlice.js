import BrandService from "@/service/Brand.service";
import removeObjectWithId from "@/utils/removeObjectWithId";
import updateBrandObjectWithId from "@/utils/updateBrandObjectWithId";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  isLoading: null,
  error: null,
};

export const brandSelector = (state) => state.brand;

export const brandSlice = createSlice({
  name: "brand",
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
    getBrandsSuccess(state, { payload }) {
      state.brands = payload.brands;
      state.isLoading = false;
    },
    addBrandSuccess(state, { payload }) {
      state.brands.push(payload.brand);
      state.isLoading = false;
    },
    editBrandSuccess(state, { payload }) {
      state.brands = updateBrandObjectWithId(
        state.brands,
        payload.brand.id,
        payload.brand.brand_name,
        payload.brand.brand_explanation,
        payload.brand.brand_photo
      );
      state.isLoading = false;
    },
    deleteBrandSuccess(state, { payload }) {
      state.brands = removeObjectWithId(state.brands, payload.brand.id);
      state.isLoading = false;
    },
  },
});

export const {
  start,
  fail,
  addBrandSuccess,
  getBrandsSuccess,
  deleteBrandSuccess,
  editBrandSuccess,
} = brandSlice.actions;

// reducers
export default brandSlice.reducer;

export const getBrands = () => async (dispatch) => {
  dispatch(start());
  try {
    const response = await BrandService.getBrands();
    dispatch(getBrandsSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};

export const addBrand =
  (brand_name, brand_photo, brand_explanation) => async (dispatch) => {
    dispatch(start());
    try {
      const response = await BrandService.addBrand(
        brand_name,
        brand_photo,
        brand_explanation
      );
      dispatch(addBrandSuccess(response));
    } catch (error) {
      dispatch(fail());
    }
  };

export const editBrand =
  (brand_id, brand_name, brand_photo, brand_explanation) =>
  async (dispatch) => {
    dispatch(start());
    try {
      const response = await BrandService.editBrand(
        brand_id,
        brand_name,
        brand_photo,
        brand_explanation
      );

      dispatch(editBrandSuccess(response));
    } catch (error) {
      console.log(error);
      dispatch(fail());
    }
  };

export const deleteBrand = (brand_id) => async (dispatch) => {
  dispatch(start());
  try {
    const response = await BrandService.deleteBrand(brand_id);
    dispatch(deleteBrandSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};
