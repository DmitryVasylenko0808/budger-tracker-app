import axios from 'axios';

import { instance } from '@/lib/instance';

type GetExportParams = {
  categoryIds: number[];
};

export class ExportApi {
  static async exportTransactions(params: GetExportParams) {
    try {
      const res = await instance.get(`/export/transactions`, {
        responseType: 'blob',
        params: {
          category_ids: params.categoryIds.map((item) => item.toString()).join(',') || null,
        },
      });

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
