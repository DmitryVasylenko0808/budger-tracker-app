import axios from 'axios';

import { instance } from '@/lib/instance';

type GetExportParams = {
  format: ExportFormat;
  categoryIds: number[];
};

export class ExportApi {
  static async exportTransactions(params: GetExportParams) {
    try {
      const res = await instance.get(`/export/transactions`, {
        responseType: 'blob',
        params: {
          format: params.format,
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
