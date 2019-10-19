const updateState = (prevState, updatedProperties) => {
  return {
    ...prevState,
    ...updatedProperties,
  };
};

export default updateState;
