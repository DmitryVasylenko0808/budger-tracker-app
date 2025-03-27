import { useState } from 'react';

export const useFilterTransactions = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const handleSelectCategoryId = (id: number) => {
    let updatedSelectedCategoryIds: number[];

    if (selectedCategoryIds.includes(id)) {
      updatedSelectedCategoryIds = selectedCategoryIds.filter((cId) => cId !== id);
    } else {
      updatedSelectedCategoryIds = [...selectedCategoryIds, id];
    }

    setSelectedCategoryIds(updatedSelectedCategoryIds);
  };

  return {
    selectedCategoryIds,
    setSelectedCategoryIds,
    onSelectCategoryId: handleSelectCategoryId,
  };
};
