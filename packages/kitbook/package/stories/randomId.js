export const ID_PREFIX = '_';
/**
 * Math.random should be unique because of its seeding algorithm. Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
 */
export function randomId() {
    return ID_PREFIX + Math.random().toString(36).slice(2, 11);
}
