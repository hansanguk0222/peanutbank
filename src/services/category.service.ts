import axios from 'axios';

interface ICategoryService {
  getCategory: (any) => any;
}

export const categoryService: ICategoryService = {
  getCategory({ userId }: { userId: string }) {
    if (process.env.NODE_ENV === 'development') {
      return axios.get(`${process.env.DEV_SERVER_URL}/category?user=${userId}`);
    } else {
      return axios.get(`${process.env.PRO_SERVER_URL}/category?user=${userId}`);
    }
  },
};
