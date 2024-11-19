import axios from 'axios';
import { IAxiosRequest } from '../types';

export const axiosRequest = async (
  PLU: string,
  shopId: number,
  action: string,
  url: string = 'http://localhost:3001/action'
) => {
  try {
    return await axios.post<IAxiosRequest>(url, {
      PLU,
      shopId,
      action,
    });
  } catch (error) {
    console.error(
      'axiosError: Server "history-of-actions-with-stock" недоступен'
    );
  }
};
