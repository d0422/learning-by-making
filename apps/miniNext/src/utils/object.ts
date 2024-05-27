export const getDiffKeysObject = (
  oldOne: Record<string, string>,
  newOne: Record<string, string>
) => {
  const changedKeys: Record<string, string> = {};

  for (const key of Object.keys(oldOne)) {
    if (key !== 'children') {
      const newValue = newOne[key];
      if (oldOne[key] !== newValue && newValue) {
        changedKeys[key] = newValue;
      }
    }
  }

  return changedKeys;
};

export const getNewKeysObject = (
  oldOne: Record<string, string>,
  newOne: Record<string, string>
) => {
  const changedKeys: Record<string, string> = {};

  for (const key of Object.keys(newOne)) {
    const newValue = newOne[key];
    if (!oldOne[key] && newValue) {
      changedKeys[key] = newValue;
    }
  }

  return changedKeys;
};

export const getDeleteKeysArray = (
  oldOne: Record<string, unknown>,
  newOne: Record<string, unknown>
) => {
  const oldKeys = Object.keys(oldOne);
  const newKeys = Object.keys(newOne);

  return oldKeys.filter((key) => !newKeys.includes(key));
};
