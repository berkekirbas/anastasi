import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { ProductAddModal, ProductTable, AdminLayout } from "@/components";
import { authCheck, authSelector } from "@/store/slices/authSlice";
import { getBrands } from "@/store/slices/brandSlice";
import { getCategoriesWithBrand } from "@/store/slices/categorySlice";

export default function Products() {
  const router = useRouter();

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    if (isAuthenticated !== null && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(authCheck());
    dispatch(getBrands());
    dispatch(getCategoriesWithBrand());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Ürünler</title>
      </Head>
      <AdminLayout
        title="Ürünler"
        children_top={
          <div className="mt-6 lg:mt-0">
            <button
              onClick={() => setShow(!show)}
              className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
            >
              Ürün Ekle
            </button>
          </div>
        }
      >
        <ProductTable />
        <ProductAddModal show={show} setShow={setShow} />
      </AdminLayout>
    </>
  );
}
