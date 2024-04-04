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
    const bottomLevelPoints = 5; // Points for the bottom level

    // Calculate the score based on the provided formula
    let value = g * Math.exp((1 - rank) * Math.log(1 / b) * (1 / j));
    let score = round(value, scale);

    // Ensure that the bottom level has the specified points
    if (rank === g) {
        score = bottomLevelPoints;
    }

    return score;
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
