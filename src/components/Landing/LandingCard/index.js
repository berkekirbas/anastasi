import SquareImage from "@/components/SquareImage";
import Link from "next/link";

export default function LandingCard({
  brand_id,
  brand_photo,
  brand_name,
  brand_explanation,
}) {
  return (
    <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
        <div className="px-4 py-5 flex-auto">
          <SquareImage imageUrl={brand_photo} />
          <h6 className="text-xl font-semibold pt-2">{brand_name}</h6>
          <p className="mt-2 mb-4 text-gray-600">{brand_explanation}</p>

          <Link
            href={`/brands/${brand_id}`}
            className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
            target="_blank"
          >
            Mağazaya Git
          </Link>
        </div>
      </div>
    </div>
  );
}
