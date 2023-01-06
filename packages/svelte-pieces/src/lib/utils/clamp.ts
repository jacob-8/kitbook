export function clamp(number: number, minimum: number, maximum: number) {
  if (number < minimum) return minimum;
  if (number > maximum) return maximum;
  return number;
}