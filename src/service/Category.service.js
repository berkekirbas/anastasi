import axios from "@/libs/axios";

class CategoryService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  csrf = async () => await axios.get(`${this.baseUrl}/sanctum/csrf-cookie`);

  getCategoriesWithBrand = async () => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    return await axios
      .get(`${this.baseUrl}/api/getCategoriesWithBrand`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  getCategories = async () => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    return await axios
      .get(`${this.baseUrl}/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  addCategory = async (
    category_name,
    category_explanation,
    category_photo,
    brand_id
  ) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("category_name", category_name);
    formData.append("category_explanation", category_explanation);
    formData.append("category_photo", category_photo);
    formData.append("brand_id", brand_id);

    return await axios
      .post(`${this.baseUrl}/api/category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  editCategory = async (
    category_id,
    category_name,
    category_explanation,
    category_photo,
    brand_id
  ) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    if (category_photo != null) {
      const formData = new FormData();

      formData.append("category_name", category_name);
      formData.append("category_explanation", category_explanation);
      formData.append("category_photo", category_photo);
      formData.append("brand_id", brand_id);

      return await axios
        .post(`${this.baseUrl}/api/category/${category_id}`, formData, {
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
        .post(
          `${this.baseUrl}/api/category/${category_id}`,
          {
            category_name: category_name,
            category_explanation: category_explanation,
            brand_id: brand_id,
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

  deleteCategory = async (category_id) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    return await axios
      .delete(`${this.baseUrl}/api/category/${category_id}`, {
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
export default new CategoryService(process.env.NEXT_PUBLIC_API_URL);
