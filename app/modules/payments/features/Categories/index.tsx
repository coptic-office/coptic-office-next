import { Category } from "@/app/[lang]/types";
import { getUnits } from "@/app/network/home";
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
    <div className='w-full flex flex-row gap-[30px] justify-between items-start'>
      {categories?.map((item) => (
        <CategoryCard category={item} lang={lang} />
      ))}
    </div>
  );
}
