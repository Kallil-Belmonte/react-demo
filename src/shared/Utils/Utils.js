class Utils {

  // LIMIT WORDS
  static limitWords(string, numberOfWords) {
    return string.split(' ').splice(0, numberOfWords).join(' ');
  }


  // GROUP ARRAYS
  static groupArrays(array, itemsQuantity) {
    let newArray = [[]];

    for (let item of array) {
      let lastIndex = newArray.length - 1;

      if (newArray[lastIndex].length < itemsQuantity) {
        newArray[lastIndex].push(item);
      } else {
        newArray.push([]);
        newArray[newArray.length - 1].push(item);
      }
    }

    return newArray;
  }

}

export default Utils;
