import { addToCard } from "@/store/slices/cardSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ProductCard({
  product_id,
  brand_name,
  product_name,
  product_price,
  product_photo,
  brand_id,
  category_id,
}) {
  const dispatch = useDispatch();

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

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <Image
        src={
          process.env.NEXT_PUBLIC_API_URL +
          "/system/public/uploads/" +
          product_photo
        }
        alt="Product"
        width={96}
        height={96}
        className="h-80 w-72 object-cover rounded-t-xl"
      />
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {brand_name}
        </span>
        <p className="text-lg font-bold text-black truncate block capitalize">
          {product_name}
        </p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            {product_price}₺
          </p>

          <div className="ml-auto text-indigo-600">
            <button
              onClick={() =>
                addProduct(
                  product_id,
                  brand_name,
                  product_name,
                  product_price,
                  product_photo,
                  brand_id,
                  category_id
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </button>
          </div>
          <div className="ml-auto">
            <Link
              href={`/brands/${brand_id}/category/${category_id}/product/${product_id}`}
            >
              <span className="transition duration-150 ease-in-out  focus:outline-none border  rounded text-indigo-600 px-8 py-2 text-sm">
                Ürünü İncele
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
