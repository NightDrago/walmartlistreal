/**
 * Numbers of decimal digits to round to
 */
const scale = 0;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @param {Number} g Constant for calculation
 * @param {Number} b Constant for calculation
 * @param {Number} j Constant for calculation
 * @returns {Number} Calculated score
 */
export function score(rank, percent, minPercent, g, b, j) {
    if (rank > 150 || rank < 1) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    let totalScore = 0;
    for (let n = 1; n <= g; n++) {
        let score = g * Math.exp((1 - n) * Math.log(1 / b) * (1 / j));
        totalScore += round(score, scale);
    }
    
    return totalScore;
}

/**
 * Round a number to a specified number of decimal places
 * @param {Number} num Number to round
 * @param {Number} scale Number of decimal places
 * @returns {Number} Rounded number
 */
export function round(num, scale) {
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

// Integration of pointvalues array
let pointvalues = [];
const g = 256; // You can adjust this value based on your needs
const b = 2; // You can adjust this value based on your needs
const j = 1; // You can adjust this value based on your needs

for (let rank = 1; rank <= 150; rank++) {
    pointvalues.push({ place: rank, points: score(rank, 100, 100, g, b, j) });
}
