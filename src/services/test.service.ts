import axios from 'axios';

interface TestService {
  jsonData: (any) => any;
}

export const testService: TestService = {
  jsonData({ num }: { num: number }) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${num}`);
  },
};
