export default async function findDataInObjectWithId(array, id) {
  return array.find((object) => object.id == id).brand_name;
}
