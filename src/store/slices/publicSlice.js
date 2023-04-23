import PublicService from "@/service/Public.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: [],
  public_brands: [],
  isLoading: null,
  error: null,
};

export const publicSelector = (state) => state.public;

export const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    start(state) {
      state.isLoading = true;
    },
    fail(state) {
      state.error = true;
      state.isLoading = false;
    },
    getBrandsSuccess(state, { payload }) {
      state.public_brands = payload.brands;
      state.isLoading = false;
    },
    getMenuSuccess(state, { payload }) {
      state.menu = payload.data;
      state.isLoading = false;
    },
  },
});

export const { start, fail, getBrandsSuccess, getMenuSuccess } =
  publicSlice.actions;

// reducers
export default publicSlice.reducer;

export const getBrands = () => async (dispatch) => {
  dispatch(start());
  try {
    const response = await PublicService.getBrands();
    dispatch(getBrandsSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};

export const getMenu = (brand_id) => async (dispatch) => {
  dispatch(start());
  try {
    const response = await PublicService.getMenu(brand_id);
    dispatch(getMenuSuccess(response));
  } catch (error) {
    dispatch(fail());
  }
};
