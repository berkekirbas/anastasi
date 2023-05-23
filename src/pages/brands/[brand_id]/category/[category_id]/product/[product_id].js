import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Loader, MenuLayout, icon_minus, icon_plus } from "@/components";
import { addToCard, cardSelector } from "@/store/slices/cardSlice";
import { getMenu, publicSelector } from "@/store/slices/publicSlice";
import Head from "next/head";
import { current } from "@reduxjs/toolkit";

export default function ProductPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { menu, isLoading } = useSelector(publicSelector);

  let [currentImageId, setCurrentImageId] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);

  // const { card } = useSelector(cardSelector);

  const { brand_id, category_id, product_id } = router.query;

  const addProduct = function (
    product_id,
    brand_name,
    product_name,
    product_price,
    product_photo,
    brand_id,
    category_id
  ) {
    dispatch(
      addToCard({
        product_id,
        brand_name,
        product_name,
        product_price,
        product_photo,
        brand_id,
        category_id,
      })
    );

    toast("Ürün Başarıyla Sepete Eklendi", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
    });
  };

  useEffect(() => {
    if (brand_id != undefined) {
      dispatch(getMenu(brand_id));
    }
  }, [brand_id, dispatch]);

  if (isLoading == null || isLoading) return <Loader />;

  const checker = function (photo1, photo2, photo3) {
    console.log(currentImageId);
    if (currentImageId == 1) {
      setCurrentImage(
        process.env.NEXT_PUBLIC_API_URL + "/system/public/uploads/" + photo1
      );
      return;
    }
    if (currentImageId == 2) {
      setCurrentImage(
        process.env.NEXT_PUBLIC_API_URL + "/system/public/uploads/" + photo2
      );
      return;
    }
    if (currentImageId == 3) {
      setCurrentImage(
        process.env.NEXT_PUBLIC_API_URL + "/system/public/uploads/" + photo3
      );
      return;
    }
    if (currentImageId > 3) {
      setCurrentImageId(3);
      setCurrentImage(
        process.env.NEXT_PUBLIC_API_URL + "/system/public/uploads/" + photo3
      );
      return;
    }
    if (currentImageId < 1) {
      setCurrentImageId(1);
      setCurrentImage(
        process.env.NEXT_PUBLIC_API_URL + "/system/public/uploads/" + photo1
      );
      return;
    }
  };

  return (
    <MenuLayout>
      {menu[0].categories
        .filter((category) => category.id == category_id)
        .map((filtered_category) =>
          filtered_category.products
            .filter((product) => product.id == product_id)
            .map((filtered_product) => (
              <>
                <Head>
                  <title>
                    {filtered_product.product_name + " - " + menu[0].brand_name}
                  </title>
                </Head>
                <main
                  key="0"
                  className="flex flex-col lg:flex-row items-center lg:gap-28 p-0 lg:p-16"
                >
                  <section className="relative h-[20%]" id="image-section">
                    <div className="absolute top-[50%] bottom-[50%] w-full flex items-center justify-between px-4 lg:hidden">
                      <button
                        id="prev"
                        className="relative left-0 bg-white h-10 w-10 p-1 rounded-full flex items-center previous"
                        onClick={() => {
                          setCurrentImageId(currentImageId--);
                          console.log(currentImageId);
                          checker(
                            filtered_product.photo1,
                            filtered_product.photo2,
                            filtered_product.photo3
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        id="next"
                        className="relative right-0 bg-white h-10 w-10 p-1 rounded-full flex items-center next"
                        onClick={async () => {
                          setCurrentImageId(currentImageId++);
                          console.log(currentImageId);
                          checker(
                            filtered_product.photo1,
                            filtered_product.photo2,
                            filtered_product.photo3
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="h-3/4 lg:mb-8 mb-2">
                      <Image
                        className="lg:light-box-image lg:rounded-xl h-full w-full lg:cursor-pointer"
                        src={
                          currentImage != null
                            ? currentImage
                            : process.env.NEXT_PUBLIC_API_URL +
                              "/system/public/uploads/" +
                              filtered_product.product_photo
                        }
                        alt="image-1"
                        id="main-img"
                        width={682}
                        height={682}
                      />
                    </div>

                    <div className="lg:flex gap-8 items-center hidden">
                      <div className="">
                        <Image
                          className={
                            currentImageId == 1
                              ? "active-thumbnail h-full rounded-md hover:opacity-50 cursor-pointer thumbnails"
                              : "h-full rounded-md hover:opacity-50 cursor-pointer thumbnails"
                          }
                          src={
                            process.env.NEXT_PUBLIC_API_URL +
                            "/system/public/uploads/" +
                            filtered_product.photo1
                          }
                          alt="image-product-1"
                          width={146}
                          height={146}
                          onClick={() => {
                            setCurrentImageId(1);
                            setCurrentImage(
                              process.env.NEXT_PUBLIC_API_URL +
                                "/system/public/uploads/" +
                                filtered_product.photo1
                            );
                          }}
                        />
                      </div>
                      {filtered_product.photo2 != null && (
                        <div className="">
                          <Image
                            className={
                              currentImageId == 2
                                ? "active-thumbnail h-full rounded-md hover:opacity-50 cursor-pointer thumbnails"
                                : "h-full rounded-md hover:opacity-50 cursor-pointer thumbnails"
                            }
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              "/system/public/uploads/" +
                              filtered_product.photo2
                            }
                            alt="image-product-2"
                            width={146}
                            height={146}
                            onClick={() => {
                              setCurrentImageId(2);
                              setCurrentImage(
                                process.env.NEXT_PUBLIC_API_URL +
                                  "/system/public/uploads/" +
                                  filtered_product.photo2
                              );
                            }}
                          />
                        </div>
                      )}
                      {filtered_product.photo3 != null && (
                        <div className="">
                          <Image
                            className={
                              currentImageId == 3
                                ? "active-thumbnail h-full rounded-md hover:opacity-50 cursor-pointer thumbnails"
                                : "h-full rounded-md hover:opacity-50 cursor-pointer thumbnails"
                            }
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              "/system/public/uploads/" +
                              filtered_product.photo3
                            }
                            alt="image-product-3"
                            width={146}
                            height={146}
                            onClick={() => {
                              setCurrentImageId(3);
                              setCurrentImage(
                                process.env.NEXT_PUBLIC_API_URL +
                                  "/system/public/uploads/" +
                                  filtered_product.photo3
                              );
                            }}
                          />
                        </div>
                      )}
                      {/*<div className="">
                        <Image
                          className="rounded-md h-full hover:opacity-50 cursor-pointer thumbnails"
                          src={
                            process.env.NEXT_PUBLIC_API_URL +
                            "/system/public/uploads/" +
                            filtered_product.product_photo
                          }
                          alt="image-product-4"
                          width={146}
                          height={146}
                        />
                        </div>*/}
                    </div>
                  </section>

                  <section
                    className="pt-2 px-8 lg:px-0 h-[80%] w-full"
                    id="hero-text"
                  >
                    <h6 className="text-sm tracking-widest uppercase text-orange font-bold">
                      {menu[0].brand_name}
                    </h6>
                    <h1 className="lg:text-4xl text-3xl font-bold capitalize my-3">
                      {filtered_product.product_name}
                    </h1>

                    <p className="my-2 text-xs text-dark_grayish_blue">
                      {filtered_product.product_explanation}
                    </p>

                    <div className="flex lg:flex-col lg:items-start lg:justify-start items-center justify-between gap-3 pb-1">
                      <div className="flex items-center gap-3 my-2">
                        <span className="text-2xl font-bold">
                          {" "}
                          {filtered_product.product_price}₺
                        </span>
                      </div>
                    </div>

                    <div className="md:flex items-center gap-4 py-4 px-1">
                      <button
                        className="shadow-lg shadow-orange/50 bigBtn"
                        id="add-to-cart"
                        onClick={() =>
                          addProduct(
                            filtered_product.id,
                            menu[0].brand_name,
                            filtered_product.product_name,
                            filtered_product.product_price,
                            filtered_product.product_photo,
                            filtered_product.brand_id,
                            filtered_product.category_id
                          )
                        }
                      >
                        <svg
                          width="22"
                          height="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                            fill="white"
                            fillRule="nonzero"
                          />
                        </svg>
                        Sepete Ekle
                      </button>
                    </div>
                  </section>
                </main>
                <section
                  id="lightbox"
                  className="transition-opacity opacity-0 lg:opacity-100 hidden fixed z-[60] top-0 left-0 right-0 w-full h-screen bg-black/75 flex items-center justify-center animate-zoom"
                >
                  <div className="max-w-[450px] relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 -top-10 text-right h-6 w-6 text-white hover:text-orange cursor-pointer"
                      id="close-lightbox"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>

                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/system/public/uploads/" +
                        filtered_product.product_photo
                      }
                      className="h-[400px] rounded-xl"
                      id="lightbox-image"
                      alt="light-box-image"
                      width={400}
                      height={400}
                    />

                    <div className="absolute bottom-[55%] w-full flex items-center justify-between">
                      <button className="relative -left-5 bg-white h-10 w-10 p-1 rounded-full flex items-center hover:text-orange previous">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button className="relative -right-5 bg-white h-10 w-10 p-1 rounded-full flex items-center hover:text-orange next">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="lg:flex gap-8 items-center hidden justify-center mt-8">
                      <div>
                        <Image
                          className="active-thumbnail h-16 rounded-md hover:opacity-50 cursor-pointer light-box-image thumbnails"
                          src={
                            process.env.NEXT_PUBLIC_API_URL +
                            "/system/public/uploads/" +
                            filtered_product.photo1
                          }
                          alt="image-product-1"
                          width={64}
                          height={64}
                        />
                      </div>
                      {filtered_product.photo2 != null && (
                        <div>
                          <Image
                            className="rounded-md h-16 hover:opacity-50 cursor-pointer light-box-image thumbnails"
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              "/system/public/uploads/" +
                              filtered_product.photo2
                            }
                            alt="image-product-2"
                            width={64}
                            height={64}
                          />
                        </div>
                      )}
                      {filtered_product.photo3 != null && (
                        <div>
                          <Image
                            className="rounded-md h-16 hover:opacity-50 cursor-pointer light-box-image thumbnails"
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              "/system/public/uploads/" +
                              filtered_product.photo3
                            }
                            alt="image-product-3"
                            width={64}
                            height={64}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </>
            ))
        )}
    </MenuLayout>
  );
}
