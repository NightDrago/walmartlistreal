// x = rank
// g = points at #1 spot
// b = 31.3889
// j = -1(*h) + 1
// h = number of levels on the list (main and extended, NOT legacy)
// r = decimal places to round to (I prefer 2)

function f(x, g, b, j, h, r) {
  if (x < 1 || x > h) {
    console.error('x is out of the allowed range.(legacy, negative, 0, or non-whole)');
    return 3;
  }

  let exponent = (1 - x) * Math.log(1 / b) * (1 / j);
  let result = g * Math.exp(exponent);

  result = Math.round(result * Math.pow(10, r)) / Math.pow(10, r);

  return result;
}
