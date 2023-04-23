import Head from "next/head";

const GuestLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Anastasiabeautylab</title>
      </Head>

      <div className="text-gray-900 antialiased">{children}</div>
    </div>
  );
};

export default GuestLayout;
