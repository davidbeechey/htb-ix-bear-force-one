const CO2SCORE_MIN = 400;
const CO2SCORE_MAX = 5000;

// values should be between 400 - 40`000
// Winsconsin Dpt of Health and Family Services
export const co2Score = (reading: number, threshold: number = 1500) => {
    if (reading <= CO2SCORE_MIN) {
        return 1;
    }
    if (reading < threshold) {
        0.5 + (Math.abs(reading - threshold) / threshold) * 0.5;
    }
    return 0.5 - (Math.abs(reading - CO2SCORE_MAX) / CO2SCORE_MAX) * 0.5;
};


export const vocScore = (reading: number, threshold: number) => {
    // implement 
}