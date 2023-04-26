import { Loader, MenuLayout, icon_minus, icon_plus } from "@/components";
import { addToCard, cardSelector } from "@/store/slices/cardSlice";
import { getMenu, publicSelector } from "@/store/slices/publicSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { menu, isLoading } = useSelector(publicSelector);

  const [show, setShow] = useState(false);

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

  return (
    <MenuLayout>
      {menu[0].categories
        .filter((category) => category.id == category_id)
        .map((filtered_category) =>
          filtered_category.products
            .filter((product) => product.id == product_id)
            .map((filtered_product) => (
              <>
                <main
                  key="1"
                  class="flex flex-col lg:flex-row items-center lg:gap-28 p-0 lg:p-16"
                >
                  <section class="relative h-[20%]" id="image-section">
                    <div class="h-3/4 lg:mb-8 mb-2">
                      <Image
                        class="lg:light-box-image lg:rounded-xl h-full w-full lg:cursor-pointer"
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          "/system/public/uploads/" +
                          filtered_product.product_photo
                        }
                        width={350}
                        height={350}
                        alt="image-1"
                        id="main-img"
                        onClick={() => setShow(!show)}
                      />
                      {`${JSON.parse(filtered_product.photos)[0]}`}

                      <div class="lg:flex gap-8 items-center hidden">
                        {JSON.parse(filtered_product.photos).forEach(
                          (photo) => (
                            <Fragment key={filtered_product.photos.length}>
                              <div class="">
                                <Image
                                  class="lg:light-box-image lg:rounded-xl h-full w-full lg:cursor-pointer"
                                  src={
                                    process.env.NEXT_PUBLIC_API_URL +
                                    "/system/public/uploads/" +
                                    photo
                                  }
                                  alt="product photos"
                                />
                              </div>
                            </Fragment>
                          )
                        )}
                      </div>
                    </div>
                  </section>

                  <section
                    class="pt-2 px-8 lg:px-0 h-[80%] w-full"
                    id="hero-text"
                  >
                    <h6 class="text-sm tracking-widest uppercase text-orange font-bold">
                      {menu[0].brand_name}
                    </h6>
                    <h1 class="lg:text-4xl text-3xl font-bold capitalize my-3">
                      {filtered_product.product_name}
                    </h1>

                    <p class="my-2 text-xs text-dark_grayish_blue">
                      {filtered_product.product_explanation}
                    </p>

                    <div class="flex lg:flex-col lg:items-start lg:justify-start items-center justify-between gap-3 pb-1">
                      <div class="flex items-center gap-3 my-2">
                        <span class="text-2xl font-bold">
                          {" "}
                          {filtered_product.product_price}₺
                        </span>
                      </div>
                    </div>

                    <div class="md:flex items-center gap-4 py-4 px-1">
                      {/*<div class="flex items-center justify-between gap-4 py-1 bg-lightgrayblue rounded-md w-full lg:w-44 md:mb-0 mb-4 lg:mb-0">
                      <button
                        class="p-2 rounded-md cursor-pointer w-full flex justify-center"
                        id="icon-minus"
                      >
                        <Image src={icon_minus} alt="icon-minus" />
                      </button>
                      <span class="font-bold w-full text-center" id="counter">
                        0
                      </span>
                      <button
                        class="p-2 rounded-md cursor-pointer w-full flex justify-center"
                        id="icon-plus"
                      >
                        <Image src={icon_plus} alt="icon-plus" />
                      </button>
            </div>*/}

                      <button
                        class="shadow-lg shadow-orange/50 bigBtn"
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
                            fill-rule="nonzero"
                          />
                        </svg>
                        Sepete ekle
                      </button>
                    </div>
                  </section>
                </main>
              </>
            ))
        )}
    </MenuLayout>
  );
}
