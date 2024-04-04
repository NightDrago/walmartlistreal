/**
 * Numbers of decimal digits to round to
 */
const scale = 0;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    // Define the constants
    const g = 150; // Maximum rank
    const b = 2; // Some constant value
    const j = 3; // Some constant value

    // Calculate the score based on the provided formula
    let sum = 0;
    for (let n = 1; n <= g; n++) {
        let value = g * Math.exp((1 - n) * Math.log(1 / b) * (1 / j));
        sum += round(value, scale);
    }

    return sum;
}

/**
 * Round a number to a specified number of decimal places
 * @param {Number} num Number to round
 * @param {Number} places Number of decimal places
 * @returns {Number} Rounded number
 */
export function round(num, places) {
    return +(Math.round(num + 'e+' + places) + 'e-' + places);
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
