import React, { Fragment, useEffect, useState } from "react";
import Loader from "@/components/Loader";
import EditBrandModal from "@/components/Modals/EditBrandModal";
import {
  brandSelector,
  deleteBrand,
  getBrands,
} from "@/store/slices/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import SquareImage from "@/components/SquareImage";

export default function BrandTable() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const { brands, isLoading, error } = useSelector(brandSelector);

  const [brandId, setBrandId] = useState();
  const [brandName, setBrandName] = useState();
  const [brandExplanation, setBrandExplanation] = useState();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const edit = function (brand_id, brand_name, brand_explanation) {
    setBrandId(brand_id);
    setBrandName(brand_name);
    setBrandExplanation(brand_explanation);
    setShow(!show);
  };

  const delete_brand = function (brand_id) {
    dispatch(deleteBrand(brand_id));
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div>
        <div className="sm:px-6 w-full">
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="mt-7 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {brands &&
                    brands.map((brand) => (
                      <Fragment key={brand.id}>
                        <tr className="h-16 border border-gray-100 rounded">
                          <td className="pl-4">
                            <div className="flex items-center">
                              <SquareImage imageUrl={brand.brand_photo} />
                            </div>
                          </td>
                          <td className="sm:pl-8 md:pl-24">
                            <div className="flex items-center">
                              <p className="text-base font-medium leading-none  mr-2">
                                <span className="text-red-500">
                                  Marka Adı:{" "}
                                </span>
                                {brand.brand_name}
                              </p>
                            </div>
                          </td>
                          <td className="sm:pl-8 md:pl-24">
                            <div className="flex items-center "> - </div>
                          </td>
                          <td className="sm:pl-8 md:pl-24">
                            <div className="flex items-center">
                              <p className="text-base font-medium leading-none  mr-2">
                                <span className="text-red-500">
                                  Marka Açıklaması:{" "}
                                </span>
                                {brand.brand_explanation}
                              </p>
                            </div>
                          </td>
                          <td className="sm:pl-8 md:pl-24">
                            <div className="flex items-center"></div>
                          </td>
                          <td className="sm:pl-8 md:pl-24">
                            <div className="flex items-center"></div>
                          </td>
                          <td className="sm:pl-8 md:pl-24">
                            <div className="flex items-center"></div>
                          </td>
                          <td className="pl-4">
                            <button
                              onClick={() =>
                                edit(
                                  brand.id,
                                  brand.brand_name,
                                  brand.brand_explanation
                                )
                              }
                              className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                            >
                              Düzenle
                            </button>
                          </td>
                          <td className="pl-4">
                            <button
                              onClick={() => delete_brand(brand.id)}
                              className="text-sm leading-none text-white py-3 px-5 bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                            >
                              Sil
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
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
        <EditBrandModal
          show={show}
          setShow={setShow}
          brand_id={brandId}
          brand_name={brandName}
          brand_explanation={brandExplanation}
        />
      </div>
    </>
  );
}
