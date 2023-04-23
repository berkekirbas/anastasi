import { Footer, LandingCard, Loader, Navigation, Spinner } from "@/components";
import { getBrands, publicSelector } from "@/store/slices/publicSlice";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const { public_brands, isLoading } = useSelector(publicSelector);

  useEffect(() => {
    dispatch(getBrands()); // publicSlice
  }, [dispatch]);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("persist:root");
    document.cookie = "XSRF-TOKEN" + "=; Max-Age=-99999999;";
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <Head>
        <title>Ana Sayfa</title>
      </Head>
      <Navigation transparent />
      <main>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: "url('/assets/background.webp')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Anastasiabeautylab
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Kozmetik Ürünleriniz en uygun fiyatlarla sizlerle
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <h1></h1>
            <div className="flex flex-wrap">
              {public_brands.map((public_brand) => (
                <LandingCard
                  key={public_brand.id}
                  brand_id={public_brand.id}
                  brand_name={public_brand.brand_name}
                  brand_explanation={public_brand.brand_explanation}
                  brand_photo={public_brand.brand_photo}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold">
                    Kaliteli Markalarımızla Sizlerin Hizmetinizdeyiz
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    Birbirinden kaliteli ve uygun fiyatlı markalarımızla sizlere
                    hizmet vermekten onur duyuyoruz
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">Kaliteli Markalar</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">
                            Uygun Fiyatlı Ürünler
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"></span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">
                            Hızlı Sipariş Hizmeti
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Hizmetlerimiz
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                  Alanında en iyisi olmaya çalıştığımız bu sektörde sizlere
                  kaliteli bir hizmet vermeye çalışıyoruz
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <h6 className="text-xl mt-5 font-semibold text-white">
                  7/24 Ulaşabileceğiniz destek hattımız
                </h6>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <h5 className="text-xl mt-5 font-semibold text-white">
                  7/24 Sipariş Verebileceğiniz web sitemiz
                </h5>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Güler Yüzlü Hizmetimiz
                </h5>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
