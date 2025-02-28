"use client";

import { useEffect, useState } from "react";
import { getCategories } from "../api";

export const Categories = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getCategories({ type: "INCOME" }).then((res) => console.log(res));
  }, []);

  return <div>Categorie</div>;
};
