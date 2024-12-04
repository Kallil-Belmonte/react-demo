/**
 * @function isValidJSONString
 * @description Checks if a string is in a valid JSON format.
 */

const isValidJSONString = (jsonString: string) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default isValidJSONString;
