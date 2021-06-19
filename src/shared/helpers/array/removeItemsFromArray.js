/**
 * removeItemsFromArray
 * @param { boolean } useIndex
 * @param { any[] } array
 * @param { any[] } itemsToRemove
 */

const removeItemsFromArray = (useIndex, array, itemsToRemove) => {
  let newArray = array;

  itemsToRemove.forEach(itemToRemove => {
    newArray = newArray.filter(arrayItem => {
      if (useIndex) {
        return array.indexOf(arrayItem) !== itemToRemove;
      }

      return arrayItem !== itemToRemove;
    });
  });

  return newArray;
};

export default removeItemsFromArray;
