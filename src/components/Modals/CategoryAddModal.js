import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, categorySelector } from "@/store/slices/categorySlice";

import Label from "../Label";
import Input from "../Input";
import Spinner from "../Spinner";
import Select from "../Select";
import { brandSelector } from "@/store/slices/brandSlice";

export default function CategoryAddModal({ show, setShow }) {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(categorySelector);

  const { brands } = useSelector(brandSelector);

  const [category_name, setCategoryName] = useState(null);
  const [category_explanation, setCategoryExplanation] = useState(null);
  const [category_photo, setCategoryPhoto] = useState(null);
  const [brand_id, setBrandId] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      addCategory(category_name, category_explanation, category_photo, brand_id)
    );
  };

  useEffect(() => {
    if (isLoading == false) {
      setCategoryName(null);
      setCategoryExplanation(null);
      setCategoryPhoto(null);
      setBrandId(null);
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
              <Label htmlFor="category_name">Kategori Adı</Label>

              <Input
                id="category_name"
                type="text"
                name="category_name"
                placeholder="Kategori Adı"
                className="block mt-1 w-full"
                onChange={(event) => setCategoryName(event.target.value)}
                required
                autoFocus
              />

              <Label htmlFor="category_explanation">
                Kategori Hakkında Açıklama
              </Label>

              <Input
                id="category_explanation"
                type="text"
                name="category_explanation"
                placeholder="Kategori Adı"
                className="block mt-1 w-full"
                onChange={(event) => setCategoryExplanation(event.target.value)}
                required
                autoFocus
              />

              <Label htmlFor="category_photo">Kategori Fotoğrafı</Label>

              <Input
                id="category_photo"
                type="file"
                name="category_photo"
                placeholder="Kategori Fotoğrafı"
                className="block mt-1 w-full"
                onChange={(event) => setCategoryPhoto(event.target.files[0])}
                required
                autoFocus
              />

              <Label htmlFor="brand_id">Marka Seçin</Label>

              <Select
                required
                defaultValue="0"
                value={brand_id}
                onChange={(event) => setBrandId(event.target.value)}
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
