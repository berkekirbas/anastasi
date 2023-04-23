import axios from "@/libs/axios";

class AuthService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  csrf = async () => await axios.get(`${this.baseUrl}/sanctum/csrf-cookie`);

  login = async (email, password) => {
    //await this.csrf();
    return await axios
      .post(`${this.baseUrl}/api/login`, { email, password })
      .then((response) => {
        return response.data;
      });
  };

  authCheck = async () => {
    const token = localStorage.getItem("token");
    //await this.csrf();
    return await axios
      .get(`${this.baseUrl}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data.message; // unauthenticated
      });
  };

  editUser = async (name, email, phone) => {
    const token = localStorage.getItem("token");
    //await this.csrf();
    return await axios
      .get(
        `${this.baseUrl}/api/editUserInfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { name, email, phone }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data.message;
      });
  };

  refreshToken = async () => {
    const token = localStorage.getItem("token");
    //await this.csrf();
    return await axios
      .post(
        `${this.baseUrl}/api/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data.message; // unauthenticated
      });
  };

  getPhone = async () => {
    //await this.csrf();
    return await axios
      .get(`${this.baseUrl}/api/getPhoneNumberForOrder`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data.message; // unauthenticated
      });
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService(process.env.NEXT_PUBLIC_API_URL);
