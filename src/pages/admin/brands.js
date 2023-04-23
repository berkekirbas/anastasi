import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { authCheck, authSelector } from "@/store/slices/authSlice";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { BrandAddModal, BrandTable } from "@/components";
import Head from "next/head";

export default function Brands() {
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
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Markalar</title>
      </Head>
      <AdminLayout
        title="Markalar"
        children_top={
          <div className="mt-6 lg:mt-0">
            <button
              onClick={() => setShow(!show)}
              className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
            >
              Marka Ekle
            </button>
          </div>
        }
      >
        <BrandTable />
        <BrandAddModal show={show} setShow={setShow} />
      </AdminLayout>
    </>
  );
}
