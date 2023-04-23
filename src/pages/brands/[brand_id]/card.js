import { Input, Label, Loader, icon_minus, icon_plus } from "@/components";
import { authSelector, getPhone } from "@/store/slices/authSlice";
import { incrementQuantity, removeItem } from "@/store/slices/cardSlice";
import { decrementQuantity } from "@/store/slices/cardSlice";
import { cardSelector } from "@/store/slices/cardSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Card() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name_surname, setNameSurname] = useState("");
  const [phoneNumber, setPhone] = useState();

  const { card } = useSelector(cardSelector);

  const { phone, isLoading } = useSelector(authSelector);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    card.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.product_price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  const submitData = (event) => {
    event.preventDefault();
    const data = {
      name_surname,
      phone,
    };

    let mes = "";

    // bana whatsapp sipariş linki oluştur 2 ürünlü bir şekilde ürünler değişken ile ayarlanabilsin
    card.forEach(
      (item) =>
        (mes += `${item.product_name} - ${item.quantity} Adet - ${
          item.product_price * item.quantity
        }TL%0A`)
    );

    const url = `https://wa.me/${
      isLoading ? "0" : phone
    }?text=Merhaba%0A---------%0AAd%20Soyad%3A%20${name_surname}%0A---------%0ASipari%C5%9Fler%0A${mes}%0A---------%0AToplam%3A%20${
      getTotal().totalPrice
    }TL

    `;

    window.open(url, "_blank");
  };

  useEffect(() => {
    dispatch(getPhone());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div
        className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
        id="chec-div"
      >
        <div
          className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
          id="checkout"
        >
          <div className="flex md:flex-row flex-col justify-end" id="cart">
            <div
              className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
              id="scroll"
            >
              <div
                className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                onClick={() => router.back()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                <p className="text-sm pl-2 leading-none">
                  Bir önceki sayfaya git
                </p>
              </div>
              <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                Sepetiniz
              </p>

              {card && card.length > 0 ? (
                card.map((cart) => (
                  <div
                    key={cart.product_id}
                    className="md:flex items-center mt-14 py-8 border-t border-gray-200"
                  >
                    <div className="w-1/4">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          "/system/public/uploads/" +
                          cart.product_photo
                        }
                        width={200}
                        height={200}
                        alt="Product 1"
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="md:pl-3 md:w-3/4">
                      <div className="flex items-center justify-between w-full pt-1">
                        <p className="text-base font-black leading-none text-gray-800">
                          {cart.product_name}
                        </p>
                        <div class="flex items-center justify-between gap-4 py-1 bg-lightgrayblue rounded-md w-full lg:w-44 md:mb-0 mb-4 lg:mb-0 lg:pl-8">
                          <button
                            class="p-2 rounded-md cursor-pointer w-full flex justify-center"
                            id="icon-minus"
                            onClick={() =>
                              dispatch(
                                decrementQuantity({
                                  product_id: cart.product_id,
                                })
                              )
                            }
                          >
                            <Image src={icon_minus} alt="icon-minus" />
                          </button>
                          <span
                            class="font-bold w-full text-center"
                            id="counter"
                          >
                            {cart.quantity}
                          </span>
                          <button
                            class="p-2 rounded-md cursor-pointer w-full flex justify-center"
                            id="icon-plus"
                            onClick={() =>
                              dispatch(
                                incrementQuantity({
                                  product_id: cart.product_id,
                                })
                              )
                            }
                          >
                            <Image src={icon_plus} alt="icon-plus" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs leading-3 text-gray-600 pt-2"></p>
                      <p className="text-xs leading-3 text-gray-600 py-4"></p>
                      <p className="w-96 text-xs leading-3 text-gray-600"></p>
                      <div className="flex items-center justify-between pt-5 pr-6">
                        <div className="flex itemms-center">
                          <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                            Kategori: {cart.category_id}
                          </p>
                          <p
                            onClick={() =>
                              dispatch(
                                removeItem({ product_id: cart.product_id })
                              )
                            }
                            className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                          >
                            Ürünü Sil {cart.product_id}
                          </p>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">
                          {cart.product_price * cart.quantity}₺
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-2xl font-bold text-gray-800 pt-5">
                    Sepetinizde ürün bulunmamaktadır.
                  </p>
                  <p className="text-base text-gray-800 pt-2">
                    Sepete ürün eklemek için <Link href="/">tıklayınız.</Link>
                  </p>
                </div>
              )}
            </div>

            <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
              <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                <div>
                  <p className="text-4xl font-black leading-9 text-gray-800">
                    ÖZET
                  </p>
                  <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-gray-800">
                      Toplam {getTotal().totalQuantity} Ürün
                    </p>
                    <p className="text-base leading-none text-gray-800">
                      {getTotal().totalPrice}₺
                    </p>
                  </div>
                  <div className="pt-3"></div>
                  <hr />
                  <div className="flex items-center justify-between pt-5">
                    <Label htmlFor="name_surname"> Ad Soyad</Label>
                  </div>
                  <div className="flex items-center justify-between ">
                    <Input
                      id="name_surname"
                      type="text"
                      value={name_surname}
                      className="block mt-1 w-full"
                      onChange={(event) => setNameSurname(event.target.value)}
                      required
                      autoFocus
                      placeholder="Adınızı ve Soyadınızı giriniz"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-5">
                    <Label htmlFor="phoneNumber">Telefon Numarası</Label>
                  </div>
                  <div className="flex items-center justify-between ">
                    <Input
                      id="phoneNumber"
                      type="text"
                      value={phoneNumber}
                      className="block mt-1 w-full"
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      autoFocus
                      placeholder="Numaranızı giriniz"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-gray-800">
                      Toplam
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                      {getTotal().totalPrice}₺
                    </p>
                  </div>
                  <button
                    onClick={(event) => submitData(event)}
                    className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                  >
                    Whatsapp`tan siparişimi ilet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
}
