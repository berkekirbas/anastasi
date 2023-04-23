import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { brandSelector } from "@/store/slices/brandSlice";

import Label from "../Label";
import Input from "../Input";
import Spinner from "../Spinner";
import Select from "../Select";
import { editProduct, productSelector } from "@/store/slices/productSlice";
import { categorySelector } from "@/store/slices/categorySlice";

export default function EditProductModal({
  show,
  setShow,
  product_id,
  product_name,
  product_explanation,
  product_price,
  brand_id,
  category_id,
}) {
  const dispatch = useDispatch();

  const { brands } = useSelector(brandSelector);
  const { categories } = useSelector(categorySelector);
  const { isLoading } = useSelector(productSelector);

  const [productName, setProductName] = useState(null);
  const [productExplanation, setProductExplanation] = useState(null);
  const [productPhoto, setProductPhoto] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      editProduct(
        product_id,
        productName,
        productExplanation,
        productPhoto,
        productPrice,
        brandId,
        categoryId
      )
    );
  };

  useEffect(() => {
    if (isLoading == false) {
      setProductName(null);
      setProductExplanation(null);
      setProductPhoto(null);
      setProductPrice(null);
      setBrandId(null);
      setCategoryId(null);
      setShow(false);
    }
  }, [isLoading, setShow]);

  //TODO: SONRA DÜZELT
  useEffect(() => {
    setProductName(product_name);
    setProductExplanation(product_explanation);
    setProductPrice(product_price);
    setBrandId(brand_id);
    setCategoryId(category_id);
  }, [show]);

  const click = () => {
    setShow(!show);
  };

  return (
    <div>
      <div
        className={`${
          show == true ? "flex" : "hidden"
        } py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0`}
        id="modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Ürün Düzenle
            </h1>
            <form onSubmit={submit}>
              <Label htmlFor="category_name">Ürün Adı</Label>

              <Input
                id="product_name"
                type="text"
                name="product_name"
                placeholder="Ürün Adı"
                className="block mt-1 w-full"
                onChange={(event) => setProductName(event.target.value)}
                value={productName}
                required
                autoFocus
              />

              <Label htmlFor="product_explanation">
                Ürün Hakkında Açıklama
              </Label>

              <Input
                id="product_explanation"
                type="text"
                name="product_explanation"
                placeholder="Ürün Açıklaması"
                className="block mt-1 w-full"
                onChange={(event) => setProductExplanation(event.target.value)}
                value={productExplanation}
                required
              />

              <Label htmlFor="product_photo">Ürün Fotoğrafı</Label>

              <Input
                id="product_photo"
                type="file"
                name="product_photo"
                placeholder="Ürün Fotoğrafı"
                className="block mt-1 w-full"
                onChange={(event) => setProductPhoto(event.target.files[0])}
                required
              />

              <Label htmlFor="brand_id">Marka </Label>

              <Select
                required
                name="brand_id"
                defaultValue={brand_id}
                value={brandId}
                onChange={(event) => setBrandId(event.target.value)}
                className="block mt-1 w-full"
              >
                <option value="0" disabled>
                  Marka Seçin
                </option>

                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brand_name}
                  </option>
                ))}
              </Select>

              <Label htmlFor="category_id">Kategori </Label>

              <Select
                required
                name="category_id"
                defaultValue={category_id}
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                className="block mt-1 w-full"
              >
                <option value="0">Kategori Seçin</option>

                {categories
                  .filter((category) => category.brand_id == brandId)
                  .map((filtered_categories) => (
                    <option
                      key={filtered_categories.id}
                      value={filtered_categories.id}
                    >
                      {filtered_categories.category_name}
                    </option>
                  ))}
              </Select>

              <div className="flex items-center justify-start w-full">
                <button
                  onClick={submit}
                  disabled={isLoading}
                  className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                >
                  {isLoading ? <Spinner /> : "Düzenle"}
                </button>
                <button
                  className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                  onClick={() => click()}
                >
                  İptal Et
                </button>
              </div>
              <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                <svg
                  onClick={() => click()}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Close"
                  className="icon icon-tabler icon-tabler-x"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
