import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { authCheck, authSelector, editUser } from "@/store/slices/authSlice";
import AdminLayout from "@/components/Layouts/AdminLayout";
import Head from "next/head";

export default function Settings() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    if (isAuthenticated !== null && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  const [nameSurname, setNameSurname] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(editUser(nameSurname, email, phone));
  };

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Ayarlar</title>
      </Head>
      <AdminLayout title="Ayarlar">
        <div class="bg-gray-200 min-h-screen pt-2 font-mono my-16">
          <div class="container mx-auto">
            <div class="inputs w-full max-w-2xl p-6 mx-auto">
              <h2 class="text-2xl text-gray-900">Hesap Ayarları</h2>
              <form
                class="mt-6 border-t border-gray-400 pt-4"
                onSubmit={(event) => submitForm(event)}
              >
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-full px-3 mb-6">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      Ad Soyad
                    </label>
                    <input
                      class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      placeholder="Ad Soyad"
                      required
                      value={nameSurname}
                      onChange={(event) => setNameSurname(event.target.value)}
                    />
                  </div>

                  <div class="w-full md:w-full px-3 mb-6">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-text-1"
                    >
                      Mail Adresiniz
                    </label>
                    <input
                      class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      placeholder="Mail Adresiniz"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  {/*
                    <div class="w-full md:w-full px-3 mb-6 ">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        password
                      </label>
                      <button class="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">
                        change your password
                      </button>
                    </div>*/}
                  <div class="w-full md:w-full px-3 mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Sipariş Alabilmek için Whatsapp Numarası (+90) ile
                      başlayarak 10 haneli olarak giriniz.
                    </label>
                    <input
                      class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      id="grid-text-1"
                      type="text"
                      placeholder="Telefon Numarası"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>

                  <div class="personal w-full border-t border-gray-400 pt-4">
                    <div class="flex justify-end">
                      <button
                        class="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                        type="submit"
                      >
                        Bilgileri Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
