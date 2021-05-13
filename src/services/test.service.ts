import axios from 'axios';

interface TestService {
  getJsonData: (any) => any;
  updateJsonData: (any) => any;
}

export const testService: TestService = {
  getJsonData({ num }: { num: number }) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${num}`);
  },
  updateJsonData({
    id,
    userId,
    body,
    title,
  }: {
    id: number;
    title: string;
    body: string;
    userId: number;
  }) {
    return axios.put(`https://jsonplaceholder.typicode.com/posts/11`, { id, userId, body, title });
  },
};
