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
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    let pointValue = calculatePoints(rank);
    if (!pointValue) {
        return 0;
    }

    let score = pointValue * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

/**
 * Calculate points based on rank using the provided mathematical expression
 * @param {Number} rank Position on the list
 * @returns {Number} Points for the given rank
 */
function calculatePoints(rank) {
    let g = 150; // Maximum rank
    let b = 2; // some constant value
    let j = 3; // some constant value
    let r = 2; // number of decimal places to round to

    let sum = 0;
    for (let n = 1; n <= g; n++) {
        let value = g * Math.exp((1 - n) * Math.log(1 / b) * (1 / j));
        sum += Math.round(value * Math.pow(10, r)) / Math.pow(10, r);
    }
    return sum;
}

console.log(calculatePoints(150)); // Output: 157.96

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
