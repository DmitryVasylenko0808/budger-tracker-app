import axios from 'axios';

import { instance } from '@/lib/instance';

type GetBreakdownParams = {
  type: TransactionType;
  from?: string;
  to?: string;
};

export class StatsApi {
  static async getSummary() {
    try {
      const res = await instance.get(`/stats/summary`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getMonthly() {
    try {
      const res = await instance.get(`/stats/monthly`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getBreakdown(params: GetBreakdownParams) {
    try {
      const res = await instance.get(`/stats/breakdown`, { params });

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
