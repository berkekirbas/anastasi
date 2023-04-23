export default function updateCategoryObjectWithId(
  array,
  category_id,
  category_name,
  category_explanation,
  category_photo,
  brand_id,
  brands
) {
  const updated_object_id = array.findIndex(
    (object) => object.id == category_id
  );

  array[updated_object_id].id = category_id;
  array[updated_object_id].category_name = category_name;
  array[updated_object_id].category_explanation = category_explanation;
  array[updated_object_id].category_photo = category_photo;
  array[updated_object_id].brand_id = brand_id;
  array[updated_object_id].brands = brands;

  return array;
}
