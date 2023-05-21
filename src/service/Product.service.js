import axios from "@/libs/axios";

class ProductService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  csrf = async () => await axios.get(`${this.baseUrl}/sanctum/csrf-cookie`);

  getProductsWithCategoryAndBrand = async () => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    return await axios
      .get(`${this.baseUrl}/api/getProductsWithCategoryAndBrand`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  getProducts = async () => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    return await axios
      .get(`${this.baseUrl}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  addProduct = async (
    product_name,
    product_explanation,
    photo1,
    photo2,
    photo3,
    product_price,
    brand_id,
    category_id
  ) => {
    // await this.csrf();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("product_name", product_name);
    formData.append("product_explanation", product_explanation);
    formData.append("product_price", product_price);
    formData.append("brand_id", brand_id);
    formData.append("category_id", category_id);

    if (photo1 != null) {
      formData.append("photo1", photo1);
    }
    if (photo2 != null) {
      formData.append("photo2", photo2);
    }
    if (photo3 != null) {
      formData.append("photo3", photo3);
    }

    return await axios
      .post(`${this.baseUrl}/api/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  editProduct = async (
    product_id,
    product_name,
    product_explanation,
    photo1,
    photo2,
    photo3,
    product_price,
    brand_id,
    category_id
  ) => {
    await this.csrf();
    const token = localStorage.getItem("token");

    if (photo1 != null || photo2 != null || photo3 != null) {
      const formData = new FormData();

      formData.append("product_name", product_name);
      formData.append("product_explanation", product_explanation);
      formData.append("photo1", photo1);
      formData.append("photo2", photo2);
      formData.append("photo3", photo3);
      formData.append("product_price", product_price);
      formData.append("brand_id", brand_id);
      formData.append("category_id", category_id);

      return await axios
        .put(`${this.baseUrl}/api/product/${product_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          return response.data;
        });
    } else {
      return await axios
        .put(
          `${this.baseUrl}/api/product/${product_id}`,
          {
            product_name: product_name,
            product_explanation: product_explanation,
            product_price: product_price,
            brand_id: brand_id,
            category_id: category_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          return response.data;
        });
    }
  };

  deleteProduct = async (product_id) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    return await axios
      .delete(`${this.baseUrl}/api/product/${product_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService(process.env.NEXT_PUBLIC_API_URL);
