import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { authCheck, authSelector } from "@/store/slices/authSlice";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { CategoryAddModal, CategoryTable } from "@/components";
import { getBrands } from "@/store/slices/brandSlice";
import Head from "next/head";

export default function Categories() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const { isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    if (isAuthenticated !== null && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(authCheck());
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Kategoriler</title>
      </Head>
      <AdminLayout
        title="Kategoriler"
        children_top={
          <div className="mt-6 lg:mt-0">
            <button
              onClick={() => setShow(!show)}
              className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
            >
              Kategori Ekle
            </button>
          </div>
        }
      >
        <CategoryTable />
        <CategoryAddModal show={show} setShow={setShow} />
      </AdminLayout>
    </>
  );
}
