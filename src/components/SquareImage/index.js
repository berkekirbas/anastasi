import React from "react";
import Image from "next/image";

export default function SquareImage({ imageUrl }) {
  return (
    <div className="flex flex-wrap justify-center">
      <div>
        <Image
          src={
            process.env.NEXT_PUBLIC_API_URL +
            "/system/public/uploads/" +
            imageUrl
          }
          alt="Square Image"
          width={128}
          height={128}
          className="shadow rounded h-auto align-middle border-none"
        />
      </div>
    </div>
  );
}
