import axios from 'axios';

interface ICategoryService {
  getCategory: (any) => any;
}

export const categoryService: ICategoryService = {
  getCategory({ nickname }: { nickname: string }) {
    if (process.env.NODE_ENV === 'development') {
      // return axios.get(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/accountbooks/users/${nickname}/years/2021/months/7`);
      return axios.get(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/categories/users/${nickname}`);
    } else {
      return axios.get(`${process.env.NEXT_PUBLIC_PRO_SERVER_URL}/categories/users/${nickname}`);
    }
  },
};
