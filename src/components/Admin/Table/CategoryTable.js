import React, { Fragment, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import {
  categorySelector,
  deleteCategory,
  getCategoriesWithBrand,
} from "@/store/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import EditCategoryModal from "@/components/Modals/EditCategoryModal";
import SquareImage from "@/components/SquareImage";
import { brandSelector, getBrands } from "@/store/slices/brandSlice";

export default function CategoryTable() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const { categories, isLoading, error } = useSelector(categorySelector);
  const { brands } = useSelector(brandSelector);

  const [category_id, setCategoryId] = useState();
  const [category_name, setCategoryName] = useState();
  const [category_explanation, setCategoryExplanation] = useState();
  const [brand_id, setBrandId] = useState();

  useEffect(() => {
    dispatch(getCategoriesWithBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const [filteringId, setFilteringId] = useState(-1);

  const setFilter = (id) => {
    setFilteringId(id);
  };

  const edit = function (
    category_id,
    category_name,
    category_explanation,
    brand_id
  ) {
    setCategoryId(category_id);
    setCategoryName(category_name);
    setCategoryExplanation(category_explanation);
    setBrandId(brand_id);
    setShow(!show);
  };

  const delete_category = function (category_id) {
    dispatch(deleteCategory(category_id));
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
                      {categories &&
                        categories.map((category) => (
                          <Fragment key={category.id}>
                            <tr className="h-16 border border-gray-100 rounded">
                              <td className="pl-4">
                                <div className="flex items-center">
                                  <SquareImage
                                    imageUrl={category.category_photo}
                                  />
                                </div>
                              </td>

                              <td className="pl-4">
                                <div className="flex items-center">
                                  <p className="text-base font-medium leading-none mr-2">
                                    <span className="text-red-500">
                                      Kategori Adı:{" "}
                                    </span>
                                    {category.category_name}
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
                                    {category.category_explanation}
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
                                    {category.brands.brand_name || ""}
                                  </p>
                                </div>
                              </td>
                              <td className="sm:pl-6 md:pl-20">
                                <div className="flex items-center"></div>
                              </td>
                              <td className="pl-4">
                                <button
                                  onClick={() =>
                                    edit(
                                      category.id,
                                      category.category_name,
                                      category.category_explanation,
                                      category.brand_id
                                    )
                                  }
                                  className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                >
                                  Düzenle
                                </button>
                              </td>
                              <td className="pl-4">
                                <button
                                  onClick={() => delete_category(category.id)}
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
                      {categories &&
                        categories
                          .filter(
                            (category) => category.brand_id == filteringId
                          )
                          .map((category) => (
                            <>
                              <Fragment key={category.id}>
                                <tr className="h-16 border border-gray-100 rounded">
                                  <td className="pl-4">
                                    <div className="flex items-center">
                                      <SquareImage
                                        imageUrl={category.category_photo}
                                      />
                                    </div>
                                  </td>

                                  <td className="pl-4">
                                    <div className="flex items-center">
                                      <p className="text-base font-medium leading-none mr-2">
                                        <span className="text-red-500">
                                          Kategori Adı:{" "}
                                        </span>
                                        {category.category_name}
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
                                        {category.category_explanation}
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
                                        {category.brands.brand_name || ""}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="sm:pl-6 md:pl-20">
                                    <div className="flex items-center"></div>
                                  </td>
                                  <td className="pl-4">
                                    <button
                                      onClick={() =>
                                        edit(
                                          category.id,
                                          category.category_name,
                                          category.category_explanation,
                                          category.brand_id
                                        )
                                      }
                                      className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                    >
                                      Düzenle
                                    </button>
                                  </td>
                                  <td className="pl-4">
                                    <button
                                      onClick={() =>
                                        delete_category(category.id)
                                      }
                                      className="text-sm leading-none text-white py-3 px-5 bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                                    >
                                      Sil
                                    </button>
                                  </td>
                                </tr>
                              </Fragment>
                            </>
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
        <EditCategoryModal
          show={show}
          setShow={setShow}
          category_id={category_id}
          category_name={category_name}
          category_explanation={category_explanation}
          brand_id={brand_id}
        />
      </div>
    </>
  );
}
