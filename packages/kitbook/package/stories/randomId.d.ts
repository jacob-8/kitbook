export declare const ID_PREFIX = "_";
/**
 * Math.random should be unique because of its seeding algorithm. Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
 */
export declare function randomId(): string;
