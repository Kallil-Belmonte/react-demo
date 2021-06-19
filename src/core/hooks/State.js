const State = (prevState, updatedProperties) => ({
  ...prevState,
  ...updatedProperties,
});

export default State;
