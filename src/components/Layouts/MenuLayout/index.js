import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";
import { publicSelector } from "@/store/slices/publicSlice";
import Loader from "@/components/Loader";

import { icon_menu, icon_close, icon_cart } from "@/components";
import { useState } from "react";
import Head from "next/head";
import { cardSelector } from "@/store/slices/cardSlice";
import { useRouter } from "next/router";
import Script from "next/script";

export default function MenuLayout({ title, children }) {
  const router = useRouter();
  const { brand_id } = router.query;

  const { menu, isLoading } = useSelector(publicSelector);

  const { card } = useSelector(cardSelector);

  const [show, setShow] = useState(false);

  const getTotalQuantity = function () {
    let total = 0;
    card.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className=" container-body">
        <header className="flex items-center justify-between py-5 lg:border-b relative w-full z-10 px-5 lg:px-0">
          <div className="flex items-center justify-center gap-3">
            <Image
              className="lg:hidden block cursor-pointer shadow-lg"
              src={icon_menu}
              alt="Hamburger Menu Icon"
              id="menu"
              onClick={() => setShow(!show)}
            />
            <Link href={`/brands/${menu[0].id}`}>{menu[0].brand_name}</Link>
            <div className={show ? "sidenav" : "sidenav hidden"} id="nav-menu">
              <Image
                src={icon_close}
                alt="close"
                id="close"
                className={
                  show
                    ? "cursor-pointer lg:hidden"
                    : "cursor-pointer lg:hidden hidden"
                }
                onClick={() => setShow(!show)}
              />

              <ul className="lg:ml-10 lg:mt-0 mt-10 items-center gap-3 lg:flex text-sm">
                <li className="nav-link">
                  <Link href="/" className="text-orange font-bold">
                    Ana Sayfa
                  </Link>
                </li>
                {menu &&
                  menu[0].categories.map((category) => (
                    <li key={category.id} className="nav-link">
                      <Link
                        href={`/brands/${menu[0].id}/category/${category.id}`}
                      >
                        {category.category_name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div
              className="relative cursor-pointer"
              onClick={() => setShow(!show)}
            >
              <Link href={`/brands/${brand_id}/card`}>
                <Image
                  className="cursor-pointer"
                  src={icon_cart}
                  alt="icon-cart"
                  id="cart"
                />
                <span
                  className=" absolute -top-1 text-center -right-2 rounded-full h-3.5 w-5 bg-orange text-white text-xs font-bold"
                  id="cart-number"
                >
                  {getTotalQuantity() || 0}
                </span>
              </Link>
            </div>
          </div>
        </header>
        {children}
      </div>
    </>
  );
}
