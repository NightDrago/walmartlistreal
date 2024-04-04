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

    let pointvalues = [
    { place: 1, points: 250 },
    { place: 2, points: 244.28 },
    { place: 3, points: 238.7 },
    { place: 4, points: 233.24 },
    { place: 5, points: 227.91 },
    { place: 6, points: 222.7 },
    { place: 7, points: 217.6 },
    { place: 8, points: 212.63 },
    { place: 9, points: 207.77 },
    { place: 10, points: 203.02 },
    { place: 11, points: 198.37 },
    { place: 12, points: 193.84 },
    { place: 13, points: 189.41 },
    { place: 14, points: 185.08 },
    { place: 15, points: 180.84 },
    { place: 16, points: 176.71 },
    { place: 17, points: 172.67 },
    { place: 18, points: 168.72 },
    { place: 19, points: 164.86 },
    { place: 20, points: 161.09 },
    { place: 21, points: 157.41 },
    { place: 22, points: 153.81 },
    { place: 23, points: 150.29 },
    { place: 24, points: 146.86 },
    { place: 25, points: 143.5 },
    { place: 26, points: 140.22 },
    { place: 27, points: 137.01 },
    { place: 28, points: 133.88 },
    { place: 29, points: 130.82 },
    { place: 30, points: 127.83 },
    { place: 31, points: 124.9 },
    { place: 32, points: 122.05 },
    { place: 33, points: 119.26 },
    { place: 34, points: 116.53 },
    { place: 35, points: 113.87 },
    { place: 36, points: 111.26 },
    { place: 37, points: 108.72 },
    { place: 38, points: 106.23 },
    { place: 39, points: 103.8 },
    { place: 40, points: 101.43 },
    { place: 41, points: 99.11 },
    { place: 42, points: 96.84 },
    { place: 43, points: 94.63 },
    { place: 44, points: 92.47 },
    { place: 45, points: 90.35 },
    { place: 46, points: 88.29 },
    { place: 47, points: 86.27 },
    { place: 48, points: 84.3 },
    { place: 49, points: 82.37 },
    { place: 50, points: 80.48 },
    { place: 51, points: 78.64 },
    { place: 52, points: 76.85 },
    { place: 53, points: 75.09 },
    { place: 54, points: 73.37 },
    { place: 55, points: 71.69 },
    { place: 56, points: 70.05 },
    { place: 57, points: 68.45 },
    { place: 58, points: 66.89 },
    { place: 59, points: 65.36 },
    { place: 60, points: 63.86 },
    { place: 61, points: 62.4 },
    { place: 62, points: 60.98 },
    { place: 63, points: 59.58 },
    { place: 64, points: 58.22 },
    { place: 65, points: 56.89 },
    { place: 66, points: 55.39 },
    { place: 67, points: 54.32 },
    { place: 68, points: 53.08 },
    { place: 69, points: 51.86 },
    { place: 70, points: 50.68 },
    { place: 71, points: 49.52 },
    { place: 72, points: 48.39 },
    { place: 73, points: 47.28 },
    { place: 74, points: 46.2 },
    { place: 75, points: 45.14 },
    { place: 76, points: 44.11 },
    { place: 77, points: 43.1 },
    { place: 78, points: 42.12 },
    { place: 79, points: 41.15 },
    { place: 80, points: 40.21 },
    { place: 81, points: 39.29 },
    { place: 82, points: 38.39 },
    { place: 83, points: 37.52 },
    { place: 84, points: 36.66 },
    { place: 85, points: 35.82 },
    { place: 86, points: 35 },
    { place: 87, points: 34.2 },
    { place: 88, points: 33.42 },
    { place: 89, points: 32.65 },
    { place: 90, points: 31.91 },
    { place: 91, points: 31.18 },
    { place: 92, points: 30.47 },
    { place: 93, points: 29.77 },
    { place: 94, points: 29.09 },
    { place: 95, points: 28.42 },
    { place: 96, points: 27.77 },
    { place: 97, points: 27.14 },
    { place: 98, points: 26.52 },
    { place: 99, points: 25.91 },
    { place: 100, points: 25.32 },
    { place: 101, points: 24.74 },
    { place: 102, points: 24.17 },
    { place: 103, points: 23.62 },
    { place: 104, points: 23.08 },
    { place: 105, points: 22.55 },
    { place: 106, points: 22.04 },
    { place: 107, points: 21.53 },
    { place: 108, points: 21.04 },
    { place: 109, points: 20.56 },
    { place: 110, points: 20.09 },
    { place: 111, points: 19.63 },
    { place: 112, points: 19.18 },
    { place: 113, points: 18.74 },
    { place: 114, points: 18.31 },
    { place: 115, points: 17.9 },
    { place: 116, points: 17.49 },
    { place: 117, points: 17.09 },
    { place: 118, points: 16.7 },
    { place: 119, points: 16.31 },
    { place: 120, points: 15.94 },
    { place: 121, points: 15.58 },
    { place: 122, points: 15.22 },
    { place: 123, points: 14.87 },
    { place: 124, points: 14.53 },
    { place: 125, points: 14.2 },
    { place: 126, points: 13.88 },
    { place: 127, points: 13.56 },
    { place: 128, points: 13.25 },
    { place: 129, points: 12.95 },
    { place: 130, points: 12.65 },
    { place: 131, points: 12.36 },
    { place: 132, points: 12.08 },
    { place: 133, points: 11.8 },
    { place: 134, points: 11.53 },
    { place: 135, points: 11.27 },
    { place: 136, points: 11.01 },
    { place: 137, points: 10.76 },
    { place: 138, points: 10.51 },
    { place: 139, points: 10.27 },
    { place: 140, points: 10.04 },
    { place: 141, points: 9.81 },
    { place: 142, points: 9.58 },
    { place: 143, points: 9.36 },
    { place: 144, points: 9.15 },
    { place: 145, points: 8.94 },
    { place: 146, points: 8.74 },
    { place: 147, points: 8.54 },
    { place: 148, points: 8.34 },
    { place: 149, points: 8.15 },
    { place: 150, points: 7.96 }
    ];

    let pointValue = pointvalues.find(p => p.place === rank);
    if (!pointValue) {
        return 0;
    }

    let score = pointValue.points * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
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
