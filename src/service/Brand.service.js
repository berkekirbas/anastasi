import axios from "@/libs/axios";

class BrandService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  csrf = async () => await axios.get(`${this.baseUrl}/sanctum/csrf-cookie`);

  getBrands = async () => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    return await axios
      .get(`${this.baseUrl}/api/brands`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  addBrand = async (brandName, brandExplanation, brandPhoto) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("brand_name", brandName);
    formData.append("brand_explanation", brandExplanation);
    formData.append("brand_photo", brandPhoto);

    return await axios
      .post(`${this.baseUrl}/api/brand`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  editBrand = async (brandId, brandName, brandExplanation, brandPhoto) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    if (brandPhoto != null) {
      const formData = new FormData();

      formData.append("brand_name", brandName);
      formData.append("brand_explanation", brandExplanation);
      formData.append("brand_photo", brandPhoto);

      return await axios
        .post(`${this.baseUrl}/api/brand/${brandId}`, formData, {
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
          `${this.baseUrl}/api/brand/${brandId}`,
          {
            brand_name: brandName,
            brand_explanation: brandExplanation,
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

  deleteBrand = async (brand_id) => {
    //await this.csrf();
    const token = localStorage.getItem("token");

    return await axios
      .delete(`${this.baseUrl}/api/brand/${brand_id}`, {
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
export default new BrandService(process.env.NEXT_PUBLIC_API_URL);
