import React from "react";

import { NotFound } from "@/components";
import Head from "next/head";

export default function _404() {
  return (
    <div>
      <Head>
        <title>Sayfa Bulunamadı</title>
      </Head>
      <NotFound />
    </div>
  );
}
