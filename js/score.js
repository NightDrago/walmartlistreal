/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // x = rank
    // g = points at #1 spot
    // b = 31.3889
    // j = -1 * h + 1
    // h = number of levels on the list (main and extended, NOT legacy)
    // r = decimal places to round to (I prefer 2)

    let numberoflevels = 64;

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

    let pointValue = f(rank, 250, 31.3889, -1*numberoflevels + 1, numberoflevels, 2);
    console.log(pointValue);
    if (!pointValue) {
        return 0;
    }

    let score = pointValue * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return score;
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
