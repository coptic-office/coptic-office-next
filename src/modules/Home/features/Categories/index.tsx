import { Category } from "@/src/types";
import { getUnits } from "@/src/network/home";
import { useEffect, useState } from "react";
import { CategoryCard } from "./components/CategoryCard";

export default function Categories({ lang }: { lang: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getUnits(lang).then((response) => {
      setCategories(response.data.message?.units);
    });
  }, []);
  return (
    <div className='w-full flex flex-wrap px-4 md:px-0   flex-col md:flex-row gap-4 md:gap-[30px] justify-between items-start'>
      {categories?.map((item) => (
        <CategoryCard category={item} lang={lang} />
      ))}
    </div>
  );
}
