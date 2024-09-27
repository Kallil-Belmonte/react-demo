/**
 * @function clearMessage
 */

const clearMessage = (
  setSuccessMessages: React.Dispatch<React.SetStateAction<string[]>>,
  index: number,
) => {
  setSuccessMessages(prevValue => prevValue.splice(index, 1));
};

export default clearMessage;
