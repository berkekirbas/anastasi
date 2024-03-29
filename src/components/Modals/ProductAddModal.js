import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categorySelector } from "@/store/slices/categorySlice";

import Label from "../Label";
import Input from "../Input";
import Spinner from "../Spinner";
import Select from "../Select";
import { brandSelector } from "@/store/slices/brandSlice";
import { addProduct, productSelector } from "@/store/slices/productSlice";

export default function ProductAddModal({ show, setShow }) {
  const dispatch = useDispatch();

  const { brands } = useSelector(brandSelector);

  const { categories } = useSelector(categorySelector);

  const { isLoading } = useSelector(productSelector);

  const [productName, setProductName] = useState(null);
  const [productExplanation, setProductExplanation] = useState(null);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [product_price, setProductPrice] = useState(null);

  const [brand_id, setBrandId] = useState(null);
  const [category_id, setCategoryId] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    dispatch(
      addProduct(
        productName,
        productExplanation,
        photo1,
        photo2,
        photo3,
        product_price,
        brand_id,
        category_id
      )
    );
  };

  useEffect(() => {
    if (isLoading == false) {
      setProductName(null);
      setProductExplanation(null);
      setPhoto1(null);
      setPhoto2(null);
      setPhoto3(null);
      setProductPrice(null);
      setBrandId(null);
      setCategoryId(null);
      setShow(false);
    }
  }, [isLoading, setShow]);

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
              Kategori Ekle
            </h1>
            <form onSubmit={submit}>
              <Label htmlFor="product_name">Ürün Adı</Label>

              <Input
                id="product_name"
                type="text"
                name="product_name"
                placeholder="Ürün Adı"
                className="block mt-1 w-full"
                onChange={(event) => setProductName(event.target.value)}
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
                required
                autoFocus
              />

              <Label htmlFor="photo1">Ürün Fotoğrafı 1</Label>

              <Input
                id="photo1"
                type="file"
                name="photo1"
                placeholder="Ürün Fotoğrafı 1"
                className="block mt-1 w-full"
                onChange={(event) => setPhoto1(event.target.files[0])}
                required
                autoFocus
              />
              <Label htmlFor="photo2">Ürün Fotoğrafı 2</Label>

              <Input
                id="photo2"
                type="file"
                name="photo2"
                placeholder="Ürün Fotoğrafı 2"
                className="block mt-1 w-full"
                onChange={(event) => setPhoto2(event.target.files[0])}
                required
                autoFocus
              />
              <Label htmlFor="photo3">Ürün Fotoğrafı 3</Label>

              <Input
                id="photo3"
                type="file"
                name="photo3"
                placeholder="Ürün Fotoğrafı 3"
                className="block mt-1 w-full"
                onChange={(event) => setPhoto3(event.target.files[0])}
                required
                autoFocus
              />

              <Label htmlFor="product_price">Ürün Fiyatı (₺)</Label>

              <Input
                id="product_price"
                type="text"
                name="product_price"
                placeholder="Ürün Fiyatı"
                className="block mt-1 w-full"
                onChange={(event) => setProductPrice(event.target.value)}
                required
                autoFocus
              />

              <Label htmlFor="brand_id">Marka Seçin</Label>

              <Select
                name="brand_id"
                required
                defaultValue="0"
                value={brand_id}
                onChange={(event) => {
                  setBrandId(event.target.value);
                }}
                className="block mt-1 w-full"
              >
                <option value="0" disabled>
                  Marka Seçin
                </option>

                {brands.map((brand) => (
                  <Fragment key={brand.id}>
                    <option value={brand.id}>{brand.brand_name}</option>
                  </Fragment>
                ))}
              </Select>

              <Label htmlFor="category_id">Kategori Seçin</Label>

              <Select
                name="category_id"
                required
                defaultValue="0"
                value={category_id}
                onChange={(event) => {
                  setCategoryId(event.target.value);
                }}
                className="block mt-1 w-full"
              >
                <option value="0" disabled>
                  Kategori Seçin
                </option>

                {categories
                  .filter((category) => category.brand_id == brand_id)
                  .map((filtered_categories) => (
                    <Fragment key={filtered_categories.id}>
                      <option value={filtered_categories.id}>
                        {filtered_categories.category_name}
                      </option>
                    </Fragment>
                  ))}
              </Select>

              <div className="flex items-center justify-start w-full">
                <button
                  onClick={submit}
                  disabled={isLoading}
                  className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                >
                  {isLoading ? <Spinner /> : "Ekle"}
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
