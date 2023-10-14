/** @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209) */
export function immutableDeepMerge(...objects: Record<string, any>[]) {
  const initialObject = {};
  const isObject = (item: any) => item && typeof item === 'object';

  return objects.reduce((previousObj, currentObj) => {
    if (currentObj === undefined) return previousObj;

    Object.keys(currentObj).forEach(key => {
      const previousValue = previousObj[key];
      const currentValue = currentObj[key];

      // Note that an Array is also an Object so check for array first
      if (Array.isArray(previousValue) && Array.isArray(currentValue)) {
        previousObj[key] = [...new Set([...previousValue, ...currentValue])]
        // if you don't want to remove duplicates, use this instead
        // previousObj[key] = [...previousValue, ...currentValue]
      }
      
      // Svelte Preprocessors can be an array of objects, or just one object
      else if (isObject(previousValue) && Array.isArray(currentValue)) {
        previousObj[key] = [previousValue, ...currentValue];
      } 
      else if (Array.isArray(previousValue) && isObject(currentValue)) {
        previousObj[key] = [...previousValue, currentValue];
      } 
      
      else if (isObject(previousValue) && isObject(currentValue)) {
        previousObj[key] = immutableDeepMerge(previousValue, currentValue);
      } else {
        previousObj[key] = currentValue;
      }
    });

    return previousObj;
  }, initialObject);
}
