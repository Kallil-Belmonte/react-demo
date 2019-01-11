import * as moment from 'moment';

export class Utils {

  // FORMAT DATE
  static formatDate(date, originalFormat = 'DD/MM/YYYY', newFormat = 'YYYY-MM-DD') {
    return moment(date, originalFormat).format(newFormat);
  }


  // CAPITALIZE FIRST LETTER
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


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


  // CLEAR FORM MESSAGE
  static clearFormMessage($this, field, index, messagesObject?, errorsObject?) {
    for (let property in messagesObject) {
      if (field === messagesObject[property]) {
        $this.setState((prevState, props) => {
          return {
            messages: {
              property: field.splice(index, 1)
            }
          }
        });
      }
    }

    for (let property in errorsObject) {
      if (field === errorsObject[property]) {
        $this.setState((prevState, props) => {
          return {
            fieldsErrors: {
              property: field.splice(index, 1)
            }
          }
        });
      }
    }
  }

}

export default Utils;
