import { useState } from "react";

import Link from "next/link";
import { useSelector } from "react-redux";
import { authSelector } from "@/store/slices/authSlice";
import { useRouter } from "next/router";

export default function Navbar({ children, title }) {
  const router = useRouter();

  const { user } = useSelector(authSelector);

  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      {/* Navigation starts */}
      {/* Mobile */}
      <div
        className={
          show
            ? "w-full h-full absolute z-40  transform  translate-x-0 "
            : "   w-full h-full absolute z-40  transform -translate-x-full"
        }
      >
        <div
          className="bg-gray-800 opacity-50 inset-0 fixed w-full h-full"
          onClick={() => setShow(!show)}
        />
        <div className="w-64 z-20 absolute left-0 z-40 top-0 bg-white shadow flex-col justify-between transition duration-150 ease-in-out h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-bold md:text2xl text-base pl-3 text-gray-800">
                    Anastasiabeautylab
                  </p>
                </div>
                <div
                  id="cross"
                  className=" text-gray-800"
                  onClick={() => setShow(!show)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
              </div>
              <ul className="f-m-m">
                <Link href="/admin">
                  <li className="text-gray-700 pt-8">
                    <div className="flex items-center">
                      <p
                        className={`${
                          router.pathname == "/admin"
                            ? "text-indigo-500"
                            : "text-gray-700"
                        } ml-3 text-lg`}
                      >
                        Yönetim Paneli
                      </p>
                    </div>
                  </li>
                </Link>
                <Link href="/admin/brands">
                  <li className="text-gray-700 pt-8">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p
                          className={`${
                            router.pathname == "/admin/brands"
                              ? "text-indigo-500"
                              : "text-gray-700"
                          } ml-3 text-lg`}
                        >
                          Markalar
                        </p>
                      </div>
                    </div>
                  </li>
                </Link>
                <Link href="/admin/categories">
                  <li className="text-gray-700 pt-8">
                    <div className="flex items-center">
                      <p
                        className={`${
                          router.pathname == "/admin/categories"
                            ? "text-indigo-500"
                            : "text-gray-700"
                        } ml-3 text-lg`}
                      >
                        Kategoriler
                      </p>
                    </div>
                  </li>
                </Link>
                <Link href="/admin/products">
                  <li className="text-gray-800 pt-8">
                    <div className="flex items-center">
                      <p
                        className={`${
                          router.pathname == "/admin/products"
                            ? "text-indigo-500"
                            : "text-gray-700"
                        } ml-3 text-lg`}
                      >
                        Ürünler
                      </p>
                    </div>
                  </li>
                </Link>

                <div className="pt-8"></div>
                <hr />

                <Link href="/admin/settings">
                  <li className="text-gray-800 pt-8">
                    <div className="flex items-center">
                      <p
                        className={`${
                          router.pathname == "/admin/settings"
                            ? "text-indigo-500"
                            : "text-gray-700"
                        } ml-3 text-lg`}
                      >
                        Ayarlar
                      </p>
                    </div>
                  </li>
                </Link>
              </ul>
            </div>
            <div className="w-full">
              <div className=" border-gray-300">
                <div className="w-full flex items-center justify-between px-6 pt-1">
                  <div className="flex items-center">
                    <p className=" text-red-400 text-base ">
                      <Link href="/admin/logout">Çıkış Yap</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <nav className="w-full mx-auto bg-white shadow">
        <div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
          <div className="h-full flex items-center">
            <div className="mr-10 flex items-center">
              <h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block">
                Anastasiabeautylab
              </h3>
            </div>
            <ul className="pr-12 xl:flex items-center h-full hidden">
              <li
                className={`cursor-pointer h-full flex items-center text-sm tracking-normal  ${
                  router.pathname == "/admin"
                    ? "text-indigo-700 border-b-2  border-indigo-700"
                    : "text-gray-800"
                } `}
              >
                <Link href="/admin">Yönetim Paneli</Link>
              </li>
              <li
                className={`cursor-pointer h-full flex items-center text-sm tracking-normal mx-10  ${
                  router.pathname == "/admin/brands"
                    ? "text-indigo-700  border-b-2 border-indigo-700"
                    : "text-gray-800"
                } `}
              >
                <Link href="/admin/brands">Markalar</Link>
              </li>
              <li
                className={`cursor-pointer h-full flex items-center text-sm tracking-normal mr-10 ${
                  router.pathname == "/admin/categories"
                    ? "text-indigo-700 border-b-2 border-indigo-700"
                    : "text-gray-800"
                } `}
              >
                <Link href="/admin/categories">Kategoriler</Link>
              </li>
              <li
                className={`cursor-pointer h-full flex items-center text-sm tracking-normal  ${
                  router.pathname == "/admin/products"
                    ? "text-indigo-700 border-b-2 border-indigo-700"
                    : "text-gray-800"
                } `}
              >
                <Link href="/admin/products">Ürünler</Link>
              </li>
            </ul>
          </div>
          <div className="h-full xl:flex items-center justify-end hidden">
            <div className="w-full h-full flex items-center">
              <div className="w-full h-full flex">
                <div
                  aria-haspopup="true"
                  className="cursor-pointer w-full flex items-center justify-end relative"
                  onClick={() => setDropdown(!dropdown)}
                >
                  {dropdown ? (
                    <ul className="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-64 ">
                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <span className="ml-2">
                            <Link href="/admin/settings">Ayarlar</Link>
                          </span>
                        </div>
                      </li>
                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                        <span className="ml-2">
                          <Link href="/admin/logout">Çıkış Yap</Link>
                        </span>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}

                  <p className="text-gray-800 text-sm ml-2">
                    {" "}
                    {user && user.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="visible xl:hidden flex items-center relative">
            <ul className="p-2 w-64 border-r bg-white absolute top-0 -ml-2 rounded right-0 shadow mt-12 lg:mt-16 hidden">
              <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <div className="flex items-center">
                  <span className="ml-2">Ayarlar</span>
                </div>
              </li>
              <li className="flex xl:hidden cursor-pointer text-sm leading-3 tracking-normal mt-2 py-2  text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                <div className="flex items-center">
                  <span className="ml-2">
                    <Link href="/admin">Yönetim Paneli</Link>
                  </span>
                </div>
              </li>
              <li className="flex xl:hidden  cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center relative">
                <span className="ml-2">
                  <Link href="/admin/brands"> Markalar</Link>
                </span>
              </li>
              <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                <span className="ml-2">
                  <Link href="/admin/categories">Kategoriler</Link>
                </span>
              </li>
              <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                <span className="ml-2">
                  <Link href="/admin/products">Ürünler</Link>
                </span>
              </li>
            </ul>
            <svg
              onClick={() => setShow(!show)}
              aria-label="Main Menu"
              aria-haspopup="true"
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={4} y1={8} x2={20} y2={8} />
              <line x1={4} y1={16} x2={20} y2={16} />
            </svg>
          </div>
        </div>
      </nav>

      {/* Navigation ends */}
    </>
  );
}
