import Navbar from "@/components/Admin/Navbar";

export default function AdminLayout({ title, children, children_top }) {
  return (
    <>
      <div className="absolute bg-gray-200 w-full h-full">
        <Navbar />

        {/* Page title starts */}
        <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
          <div>
            <h4 className="text-2xl font-bold leading-tight text-gray-800">
              {title}
            </h4>
          </div>
          {children_top}
        </div>
        {/* Page title ends */}
        <div className="container mx-auto px-6">
          {/* Remove class [ h-64 ] when adding a card block */}
          {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
          <div className="w-full h-64 rounded ">
            {/* Place your content here */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
