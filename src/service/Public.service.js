import axios from "@/libs/axios";

class PublicService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  csrf = async () => await axios.get(`${this.baseUrl}/sanctum/csrf-cookie`);

  getBrands = async () => {
    //await this.csrf();

    return await axios.get(`${this.baseUrl}/api/getBrands`).then((response) => {
      return response.data;
    });
  };

  getMenu = async (brand_id) => {
    //await this.csrf();

    return await axios
      .get(
        `${this.baseUrl}/api/_public_getBrandsWithAllProductsAndAllCategories/${brand_id}`
      )
      .then((response) => {
        return response.data;
      });
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PublicService(process.env.NEXT_PUBLIC_API_URL);
