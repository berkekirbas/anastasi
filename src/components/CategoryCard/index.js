import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
  category_name,
  category_photo,
  category_explanation,
  brand_id,
  category_id,
}) {
  return (
    <Link href={`/brands/${brand_id}/category/${category_id}`}>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Image
          src={
            process.env.NEXT_PUBLIC_API_URL +
            "/system/public/uploads/" +
            category_photo
          }
          alt="Category"
          width={96}
          height={96}
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {category_name}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {category_explanation}
          </p>
          <div className="flex items-center">
            <div className="ml-auto">
              <span className="transition duration-150 ease-in-out  focus:outline-none border  rounded text-indigo-600 px-8 py-2 text-sm">
                Kategoriye git
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
