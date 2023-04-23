export default function updateBrandObjectWithId(
  array,
  brand_id,
  brand_name,
  brand_explanation,
  brand_photo
) {
  const updated_object_id = array.findIndex((object) => object.id == brand_id);

  array[updated_object_id].brand_name = brand_name;
  array[updated_object_id].brand_explanation = brand_explanation;
  array[updated_object_id].brand_photo = brand_photo;

  return array;
}
