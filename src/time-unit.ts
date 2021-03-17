export interface TimeUnit {
  lowerBound: number;
  upperBound: number;
}

export const Minutes = {
  lowerBound: 0,
  upperBound: 59,
};

export const Hours = {
  lowerBound: 0,
  upperBound: 23,
};
