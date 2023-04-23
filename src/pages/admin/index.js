import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { authCheck, authSelector } from "@/store/slices/authSlice";
import AdminLayout from "@/components/Layouts/AdminLayout";
import Head from "next/head";
import { Card } from "@/components";
import { brandSelector, getBrands } from "@/store/slices/brandSlice";
import {
  categorySelector,
  getCategoriesWithBrand,
} from "@/store/slices/categorySlice";
import {
  getProductsWithCategoryAndBrand,
  productSelector,
} from "@/store/slices/productSlice";

export default function Admin() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

  const { brands } = useSelector(brandSelector);
  const { categories } = useSelector(categorySelector);
  const { products } = useSelector(productSelector);

  useEffect(() => {
    if (isAuthenticated !== null && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(authCheck());
    dispatch(getBrands());
    dispatch(getCategoriesWithBrand());
    dispatch(getProductsWithCategoryAndBrand());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Yönetim Paneli</title>
      </Head>
      <AdminLayout title="Yönetim Paneli">
        <div className="flex flex-center justify-center align-center pb-4">
          <h1 className="text-2xl font-bold leading-tight text-gray-800">
            Hoşgeldiniz
          </h1>
        </div>
        <div className="flex flex-center justify-center align-center pb-4">
          <h1 className="text-2xl font-bold leading-tight text-gray-800">
            Güncel İstatistiklerimiz
          </h1>
        </div>
        <div>
          <div className="pb-8">
            {brands && (
              <Card title="Marka Sayısı" description={brands.length} />
            )}
          </div>

          <div className="pb-8">
            {categories && (
              <Card title="Kategori Sayısı" description={categories.length} />
            )}
          </div>

          <div>
            {products && (
              <Card title="Ürün Sayısı" description={products.length} />
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
