export const errorFunction = (
  errorBit: boolean,
  statuscode: number,
  msg: string,
  data?: any
) => {
  if (errorBit) return { statuscode: statuscode, message: msg };
  else
    return {
      statuscode: statuscode,
      message: msg,
      data: data,
    };
};
