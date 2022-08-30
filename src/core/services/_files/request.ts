const request = async <Type>(method: () => Promise<Response>): Promise<Type> => {
  try {
    const response = await method();
    return await response.json();
  } catch (error: any) {
    throw error;
  }
};

export default request;
