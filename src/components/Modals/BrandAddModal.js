import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrand, brandSelector } from "@/store/slices/brandSlice";

import Label from "../Label";
import Input from "../Input";
import Spinner from "../Spinner";

export default function BrandAddModal({ show, setShow }) {
  const dispatch = useDispatch();
  const { brands, isLoading } = useSelector(brandSelector);

  const [brandName, setBrandName] = useState(null);
  const [brandExplanation, setBrandExplanation] = useState(null);
  const [brandPhoto, setBrandPhoto] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    dispatch(addBrand(brandName, brandExplanation, brandPhoto));
  };

  useEffect(() => {
    if (isLoading == false) {
      setBrandName(null);
      setBrandExplanation(null);
      setBrandPhoto(null);
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
              Marka Ekle
            </h1>
            <form onSubmit={submit}>
              <Label htmlFor="brand_name">Marka Adı</Label>

              <Input
                id="brand_name"
                type="text"
                name="brand_name"
                placeholder="Marka Adı"
                className="block mt-1 w-full"
                onChange={(event) => setBrandName(event.target.value)}
                required
                autoFocus
              />

              <Label htmlFor="brand_explanation">Marka Hakkında Açıklama</Label>

              <Input
                id="brand_explanation"
                type="text"
                name="brand_explanation"
                placeholder="Marka Adı"
                className="block mt-1 w-full"
                onChange={(event) => setBrandExplanation(event.target.value)}
                required
                autoFocus
              />

              <Label htmlFor="brand_photo">Marka Fotoğrafı</Label>

              <Input
                id="brand_photo"
                type="file"
                name="brand_photo"
                placeholder="Marka Adı"
                className="block mt-1 w-full"
                onChange={(event) => setBrandPhoto(event.target.files[0])}
                required
                autoFocus
              />

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
