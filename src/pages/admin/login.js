import React, { useMemo } from "react";

import {
  GuestLayout,
  ApplicationLogo,
  AuthCard,
  Button,
  Input,
  InputError,
  Label,
  Spinner,
} from "@/components";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { authCheck, authSelector, login } from "@/store/slices/authSlice";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, error } = useSelector(authSelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: EKLENECEK
  const [shouldRemember, setShouldRemember] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated !== null && isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Giriş Yap</title>
      </Head>
      <GuestLayout>
        <AuthCard
          logo={
            <Link href="/">
              <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            </Link>
          }
        >
          <form onSubmit={submitForm}>
            {/* Email Address */}
            <div>
              <Label htmlFor="email">Mail Adresiniz</Label>

              <Input
                id="email"
                type="email"
                value={email}
                className="block mt-1 w-full"
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />

              {/*<InputError messages={errors.email} className="mt-2" />*/}
            </div>

            {/* Password */}
            <div className="mt-4">
              <Label htmlFor="password">Şifreniz</Label>

              <Input
                id="password"
                type="password"
                value={password}
                className="block mt-1 w-full"
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
              />

              {/*<InputError messages={errors.password} className="mt-2" />*/}
            </div>

            {/* Remember Me */}
            <div className="block mt-4">
              <label htmlFor="remember_me" className="inline-flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  name="remember"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(event) => setShouldRemember(event.target.checked)}
                />

                <span className="ml-2 text-sm text-gray-600">Beni Hatırla</span>
              </label>
            </div>

            <div className="flex items-center justify-end mt-4">
              <Button className="ml-3" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Giriş yap"}
              </Button>
            </div>
          </form>
        </AuthCard>
      </GuestLayout>
    </>
  );
}
