// SET PAGE TITLE
export const setPageTitle = (title) => {
  document.title = `React Demo | ${title}`;
};


// GROUP ARRAY ITEMS
export const groupArrayItemsInArrays = (array, itemsQuantity) => {
  const newArray = [[]];

  array.forEach((item, index) => {
    const lastIndex = newArray.length - 1;

    if (newArray[lastIndex].length < itemsQuantity) {
      newArray[lastIndex].push(item);
    } else {
      newArray.push([]);
      newArray[newArray.length - 1].push(item);
    }
  });

  return newArray;
};


// REMOVE ITEMS FROM INDEXES
export const removeItemsFromIndexes = (array, arrayIndexes) => {
  let newArray = array;

  arrayIndexes.forEach((indexItem) => {
    newArray = newArray.filter(arrayItem => array.indexOf(arrayItem) !== indexItem);
  });

  return newArray;
};


// CLEAR FORM MESSAGE
export const clearFormMessage = ($this, formName, objectName, propertyName, index) => {
  $this.setState((prevState, props) => ({
    [formName]: {
      ...prevState[formName],
      [objectName]: {
        ...prevState[formName][objectName],
        [propertyName]: removeItemsFromIndexes(prevState[formName][objectName][propertyName], [index])
      }
    }
  }));
};
