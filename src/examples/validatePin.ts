export const validatePIN = (pin: string) => {
  return pin.match(/^\d{4}$|^\d{6}$/g)?.length === 1;
};
