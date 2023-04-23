import React, { Fragment, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import {
  productSelector,
  deleteProduct,
  getProductsWithCategoryAndBrand,
} from "@/store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import EditProductModal from "@/components/Modals/EditProductModal";
import SquareImage from "@/components/SquareImage";
import { brandSelector, getBrands } from "@/store/slices/brandSlice";
import { categorySelector } from "@/store/slices/categorySlice";

//import EditCategoryModal from "@/components/Modals/EditCategoryModal";

export default function ProductTable() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const { products, isLoading, error } = useSelector(productSelector);
  const { brands } = useSelector(brandSelector);

  const [product_id, setProductId] = useState();
  const [productName, setProductName] = useState();
  const [productExplanation, setProductExplanation] = useState();
  const [productPrice, setProductPrice] = useState();
  const [brand_id, setBrandId] = useState();
  const [category_id, setCategoryId] = useState();

  const [filteringId, setFilteringId] = useState(-1);

  useEffect(() => {
    dispatch(getProductsWithCategoryAndBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const edit = function (
    product_id,
    product_name,
    product_explanation,
    product_price,
    brand_id,
    category_id
  ) {
    setProductId(product_id);
    setProductName(product_name);
    setProductExplanation(product_explanation);
    setProductPrice(product_price);
    setBrandId(brand_id);
    setCategoryId(category_id);
    setShow(!show);
  };

  const delete_product = function (product_id) {
    dispatch(deleteProduct(product_id));
  };

  const setFilter = function (id) {
    setFilteringId(id);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div>
        <div className="sm:px-6 w-full">
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div class="sm:flex items-center justify-between">
              <div class="flex items-center">
                <button
                  class="rounded-full focus:outline-none focus:ring555-2  focus:bg-indigo-50 focus:ring-indigo-800"
                  onClick={() => setFilteringId(-1)}
                >
                  <div
                    class={
                      filteringId == -1
                        ? "text-indigo-600 dark:text-gray-200  hover:text-indigo-700 hover:bg-indigo-100 py-2 px-8 rounded-full"
                        : "py-2 px-8 rounded-full"
                    }
                  >
                    <p>Tümü</p>
                  </div>
                </button>
                {brands.map((brand) => (
                  <button
                    class="rounded-full focus:outline-none focus:ring555-2  focus:bg-indigo-50 focus:ring-indigo-800"
                    key={brand.id}
                    onClick={() => setFilter(brand.id)}
                  >
                    <div
                      class={
                        filteringId == brand.id
                          ? "text-indigo-600 dark:text-gray-200  hover:text-indigo-700 hover:bg-indigo-100 py-2 px-8 rounded-full"
                          : "py-2 px-8 rounded-full"
                      }
                    >
                      <p>{brand.brand_name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {filteringId == -1 ? (
                    <>
                      {products &&
                        products.map((product) => (
                          <Fragment key={product.id}>
                            <tr className="h-16 border border-gray-100 rounded">
                              <td className="pl-4">
                                <div className="flex items-center">
                                  <SquareImage
                                    imageUrl={product.product_photo}
                                  />
                                </div>
                              </td>

                              <td className="pl-4">
                                <div className="flex items-center">
                                  <p className="text-base font-medium leading-none mr-2">
                                    <span className="text-red-500">
                                      Kategori Adı:{" "}
                                    </span>
                                    {product.product_name}
                                  </p>
                                </div>
                              </td>
                              <td className="sm:pl-6 md:pl-20">
                                <div className="flex items-center "> </div>
                              </td>
                              <td className="sm:pl-6 md:pl-20">
                                <div className="flex items-center">
                                  <p className="text-base font-medium leading-none  mr-2">
                                    <span className="text-red-500">
                                      Kategori Açıklaması:
                                    </span>{" "}
                                    {product.product_explanation}
                                  </p>
                                </div>
                              </td>
                              <td className="sm:pl-6 md:pl-20">
                                <div className="flex items-center"> </div>
                              </td>
                              <td className="sm:pl-6 md:pl-20">
                                <div className="flex items-center">
                                  <p className="text-base font-medium leading-none  mr-2">
                                    <span className="text-red-500">Marka:</span>{" "}
                                    {product.brands.brand_name || ""}
                                  </p>
                                </div>
                              </td>
                              <td className="sm:pl-6 md:pl-20">
                                <div className="flex items-center">
                                  <p className="text-base font-medium leading-none  mr-2">
                                    <span className="text-red-500">
                                      Kategori:
                                    </span>{" "}
                                    {product.category.category_name || ""}
                                  </p>
                                </div>
                              </td>

                              <td className="pl-4">
                                <button
                                  onClick={() =>
                                    edit(
                                      product.id,
                                      product.product_name,
                                      product.product_explanation,
                                      product.product_price,
                                      product.brand_id,
                                      product.category_id
                                    )
                                  }
                                  className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                >
                                  Düzenle
                                </button>
                              </td>
                              <td className="pl-4">
                                <button
                                  onClick={() => delete_product(product.id)}
                                  className="text-sm leading-none text-white py-3 px-5 bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                                >
                                  Sil
                                </button>
                              </td>
                            </tr>
                          </Fragment>
                        ))}
                    </>
                  ) : (
                    <>
                      {products &&
                        products
                          .filter((product) => product.brand_id == filteringId)
                          .map((product) => (
                            <Fragment key={product.id}>
                              <tr className="h-16 border border-gray-100 rounded">
                                <td className="pl-4">
                                  <div className="flex items-center">
                                    <SquareImage
                                      imageUrl={product.product_photo}
                                    />
                                  </div>
                                </td>

                                <td className="pl-4">
                                  <div className="flex items-center">
                                    <p className="text-base font-medium leading-none mr-2">
                                      <span className="text-red-500">
                                        Kategori Adı:{" "}
                                      </span>
                                      {product.product_name}
                                    </p>
                                  </div>
                                </td>
                                <td className="sm:pl-6 md:pl-20">
                                  <div className="flex items-center "> </div>
                                </td>
                                <td className="sm:pl-6 md:pl-20">
                                  <div className="flex items-center">
                                    <p className="text-base font-medium leading-none  mr-2">
                                      <span className="text-red-500">
                                        Kategori Açıklaması:
                                      </span>{" "}
                                      {product.product_explanation}
                                    </p>
                                  </div>
                                </td>
                                <td className="sm:pl-6 md:pl-20">
                                  <div className="flex items-center"> </div>
                                </td>
                                <td className="sm:pl-6 md:pl-20">
                                  <div className="flex items-center">
                                    <p className="text-base font-medium leading-none  mr-2">
                                      <span className="text-red-500">
                                        Marka:
                                      </span>{" "}
                                      {product.brands.brand_name || ""}
                                    </p>
                                  </div>
                                </td>
                                <td className="sm:pl-6 md:pl-20">
                                  <div className="flex items-center">
                                    <p className="text-base font-medium leading-none  mr-2">
                                      <span className="text-red-500">
                                        Kategori:
                                      </span>{" "}
                                      {product.category.category_name || ""}
                                    </p>
                                  </div>
                                </td>

                                <td className="pl-4">
                                  <button
                                    onClick={() =>
                                      edit(
                                        product.id,
                                        product.product_name,
                                        product.product_explanation,
                                        product.product_price,
                                        product.brand_id,
                                        product.category_id
                                      )
                                    }
                                    className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                  >
                                    Düzenle
                                  </button>
                                </td>
                                <td className="pl-4">
                                  <button
                                    onClick={() => delete_product(product.id)}
                                    className="text-sm leading-none text-white py-3 px-5 bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                                  >
                                    Sil
                                  </button>
                                </td>
                              </tr>
                            </Fragment>
                          ))}
                    </>
                  )}
                  <tr className="h-3"></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <style>
          {`
      @media (min-width: 640px) {
        .sm\:pl-8 {
          padding-left: 2rem;
        }
      }
  
      @media (min-width: 768px) {
        .md\:pl-24 {
          padding-left: 6rem;
        }
      }
  
      @media (min-width: 1280px) {
        .xl\:px-10 {
          padding-left: 10rem;
          padding-right: 10rem;
        }
      }
      `}
        </style>
        <EditProductModal
          show={show}
          setShow={setShow}
          product_id={product_id}
          product_name={productName}
          product_explanation={productExplanation}
          product_price={productPrice}
          brand_id={brand_id}
          category_id={category_id}
        />
      </div>
    </>
  );
}
