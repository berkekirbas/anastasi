export default function removeObjectWithId(array, object_id) {
  const objectWithIdIndex = array.findIndex(
    (object) => object.id === object_id
  );

  if (objectWithIdIndex > -1) {
    array.splice(objectWithIdIndex, 1);
  }

  return array;
}
