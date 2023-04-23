export default function Header({ brand_name = "", category_name = "" }) {
  return (
    <>
      {category_name == "" ? (
        <div class="text-center p-10">
          <h1 class="font-bold text-4xl mb-4">{brand_name}</h1>
          <h1 class="text-xl">
            Mağazıma Hoşgeldiniz. Kategorilerimizden birisini seçerek alışverişe
            başlayabilirsiniz.
          </h1>
        </div>
      ) : (
        <div class="text-center p-10">
          <h1 class="font-bold text-4xl mb-4">{brand_name}</h1>
          <h1 class="text-3xl">{category_name}</h1>
        </div>
      )}
    </>
  );
}
