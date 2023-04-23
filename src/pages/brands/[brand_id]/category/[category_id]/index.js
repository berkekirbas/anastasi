import { Card, Header, Loader, MenuLayout, ProductCard } from "@/components";
import { getMenu, publicSelector } from "@/store/slices/publicSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryPage() {
  const dispatch = useDispatch();

  const { menu, isLoading } = useSelector(publicSelector);

  const router = useRouter();
  const { brand_id, category_id } = router.query;

  useEffect(() => {
    if (brand_id != undefined) {
      dispatch(getMenu(brand_id));
    }
  }, [brand_id, dispatch]);

  if (isLoading == null || isLoading) return <Loader />;

  return (
    <MenuLayout
      title={menu[0].categories
        .filter((category) => category.id == category_id)
        .map((filtered) => filtered.category_name)}
    >
      <Header
        brand_name={menu[0].brand_name}
        category_name={menu[0].categories
          .filter((category) => category.id == category_id)
          .map((filtered) => filtered.category_name)}
      />
      <div className="flex flex-center align-center justify-center">
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {menu[0].categories
            .filter((category) => category.id == category_id)
            .map((filtered_category) =>
              filtered_category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product_id={product.id}
                  brand_name={menu[0].brand_name}
                  product_name={product.product_name}
                  product_photo={product.product_photo}
                  product_price={product.product_price}
                  brand_id={product.brand_id}
                  category_id={product.category_id}
                />
              ))
            )}
        </section>
      </div>
    </MenuLayout>
  );
}
