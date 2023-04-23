export default function updateProductObjectWithId(
  array,
  product_id,
  product_name,
  product_explanation,
  product_photo,
  product_price,
  brand_id,
  category_id,
  brands,
  category
) {
  const updated_object_id = array.findIndex(
    (object) => object.id == product_id
  );

  array[updated_object_id].id = product_id;
  array[updated_object_id].product_name = product_name;
  array[updated_object_id].product_explanation = product_explanation;
  array[updated_object_id].product_photo = product_photo;
  array[updated_object_id].product_price = product_price;
  array[updated_object_id].brand_id = brand_id;
  array[updated_object_id].category_id = category_id;
  array[updated_object_id].brands = brands;
  array[updated_object_id].category = category;

  return array;
}
