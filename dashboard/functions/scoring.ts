const CO2SCORE_MIN = 400;
const CO2SCORE_MAX = 5000;

// generalized scoring function
// returns a score between 0 and 1
// tries to boost scores below the goal and penalize scores above the goal
export const scoreSensor = (reading: number, goal: number) => {
    let dynamic_weight: number = 0;
    if (reading > goal) {
        let delta_difference: number = Math.abs(goal - reading) / reading;
        if (delta_difference > 1) {
            return 1;
        }
        dynamic_weight = 1 - delta_difference * 2.0;
        let score: number = dynamic_weight * (1 - delta_difference)
        if (score <= 0) {
            return 0;
        } else {
            return score;
        }
    } else {
        let delta_difference: number = Math.abs(reading - goal) / goal;
        if (delta_difference <= 0.1) {
            return 1 - delta_difference;
        }
        dynamic_weight = 1.0 + (delta_difference / 0.1) * 0.03;
        let score: number = dynamic_weight * (1 - delta_difference)
        if (score > 1) {
            return 1;
        } else {
            return score;
        }
    }
};
