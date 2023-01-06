/** @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209) */
export function immutableDeepMerge(...objects: Record<string, any>[]) {
  const initialObject = {};
  const isObject = (item: any) => item && typeof item === 'object';

  return objects.reduce((previousObj, currentObj) => {
    if (currentObj === undefined) return previousObj;

    Object.keys(currentObj).forEach(key => {
      const previousValue = previousObj[key];
      const currentValue = currentObj[key];

      if (Array.isArray(previousValue) && Array.isArray(currentValue)) {
        previousObj[key] = [...new Set([...previousValue, ...currentValue])]
        // if you don't want to remove duplicates, use this instead
        // previousObj[key] = [...previousValue, ...currentValue]
      } else if (isObject(previousValue) && isObject(currentValue)) {
        previousObj[key] = immutableDeepMerge(previousValue, currentValue);
      } else {
        previousObj[key] = currentValue;
      }
    });

    return previousObj;
  }, initialObject);
}
