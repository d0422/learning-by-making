export const getLongerArrayLength = <T>(array1: T[], array2: T[]) => {
  if (array1.length > array2.length) return array1.length;
  return array2.length;
};

export const createArray = (length: number) => {
  return Array.from({ length }, (_, i) => i);
};
