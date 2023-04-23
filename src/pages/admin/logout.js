import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Loader } from "@/components";
import Head from "next/head";
//import { useDispatch, useSelector } from "react-redux";

//import { authCheck, authSelector } from "@/store/slices/authSlice";

export default function Admin() {
  const router = useRouter();

  /*const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);*/

  useEffect(
    () => {
      /*if (isAuthenticated !== null && !isAuthenticated) {
      router.push("/admin/login");
    } else {*/
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("persist:root");
      document.cookie = "XSRF-TOKEN" + "=; Max-Age=-99999999;";
      router.push("/admin/login");
      /*}*/
    },
    [
      /*isAuthenticated, router*/
    ]
  );

  /* useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);*/

  return (
    <>
      <Head>
        <title>Çıkış Yapılıyor</title>
      </Head>
      <Loader title="Çıkış Yapılıyor" />
    </>
  );
}
