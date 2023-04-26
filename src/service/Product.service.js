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
    product_photo,
    product_price,
    brand_id,
    category_id
  ) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("product_name", product_name);
    formData.append("product_explanation", product_explanation);
    formData.append("product_price", product_price);
    formData.append("brand_id", brand_id);
    formData.append("category_id", category_id);

    for (let i = 0; i < product_photo.length; i++) {
      formData.append("product_photo[]", product_photo[i]);
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
    product_photo,
    product_price,
    brand_id,
    category_id
  ) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    if (product_photo != null) {
      const formData = new FormData();

      formData.append("product_name", product_name);
      formData.append("product_explanation", product_explanation);
      formData.append("product_photo", product_photo);
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
