import { CategoryCard, Header, Loader, MenuLayout } from "@/components";
import { getMenu, publicSelector } from "@/store/slices/publicSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { icon_plus, icon_minus } from "@/components";
import Image from "next/image";

export default function BrandPage() {
  const dispatch = useDispatch();

  const { menu, isLoading } = useSelector(publicSelector);

  const router = useRouter();
  const { brand_id } = router.query;

  useEffect(() => {
    if (brand_id != undefined) {
      dispatch(getMenu(brand_id));
    }
  }, [brand_id]);

  if (isLoading == null || isLoading) return <Loader />;

  return (
    <MenuLayout title={menu[0].brand_name}>
      <Header brand_name={menu[0].brand_name} />
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {menu[0].categories.map((category) => (
          <CategoryCard
            key={category.id}
            category_name={category.category_name}
            category_photo={category.category_photo}
            category_explanation={category.category_explanation}
            category_id={category.id}
            brand_id={category.brand_id}
          />
        ))}
      </section>
    </MenuLayout>
  );
}
