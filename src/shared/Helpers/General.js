import React from 'react';

import { PROJECT_TITLE } from 'shared/Files/Consts';

// SET PAGE TITLE
export const setPageTitle = (title) => {
  document.title = `${PROJECT_TITLE} | ${title}`;
};


// GROUP ARRAY ITEMS IN ARRAYS
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


// REMOVE ITEMS FROM ARRAY
export const removeItemsFromArray = (useIndex, array, itemsToRemove) => {
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


// SET FIELD CLASS NAME
export const setFieldClassName = (errorField) => {
  return `form-control ${errorField ? 'is-invalid': ''}`;
};


// GET FIELD ERROR MESSAGE
export const getFieldErrorMessage = (errorField) => {
  return errorField && <div className="d-block invalid-feedback">{errorField.message}</div>
};
