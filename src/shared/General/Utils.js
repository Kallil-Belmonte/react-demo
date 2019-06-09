import * as moment from 'moment';

export class Utils {

  // SET PAGE TITLE
  static setPageTitle(title) {
    document.title = `React Demo | ${title}`;
  }


  // FORMAT DATE
  static formatDate(date, originalFormat = 'YYYY-MM-DD', newFormat = 'DD/MM/YYYY') {
    return moment(date, originalFormat).format(newFormat);
  }


  // CAPITALIZE FIRST LETTER
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // CAPITALIZE TEXT
  static capitalizeText(text) {
    return text.toLowerCase().replace(/\b./g, function(value) {
      return value.toUpperCase();
    });
  };


  // LIMIT WORDS
  static limitWords(text, numberOfWords) {
    return text.split(' ').splice(0, numberOfWords).join(' ');
  }


  // GROUP ARRAYS
  static groupArrays(array, itemsQuantity) {
    const newArray = [[]];

    for (let item of array) {
      const lastIndex = newArray.length - 1;

      if (newArray[lastIndex].length < itemsQuantity) {
        newArray[lastIndex].push(item);
      } else {
        newArray.push([]);
        newArray[newArray.length - 1].push(item);
      }
    }

    return newArray;
  }


  // REMOVE ITEMS FROM INDEXES
  static removeItemsFromIndexes(array, arrayIndexes) {
    let newArray = array;

    arrayIndexes.forEach((indexItem) => {
      newArray = newArray.filter(arrayItem => array.indexOf(arrayItem) !== indexItem);
    });

    return newArray;
  }


  // CLEAR FORM MESSAGE
  static clearFormMessage($this, formName, objectName, propertyName, index) {
    $this.setState((prevState, props) => {
      return {
        ...prevState,
        [formName]: {
          ...prevState[formName],
          [objectName]: {
            ...prevState[formName][objectName],
            [propertyName]: this.removeItemsFromIndexes(prevState[formName][objectName][propertyName], [index])
          }
        }
      }
    });
  }

}

export default Utils;
