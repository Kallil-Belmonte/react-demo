const updateState = (oldState, updatedProperties) => {
  return {
    ...oldState,
    ...updatedProperties
  };
};

export default updateState;
