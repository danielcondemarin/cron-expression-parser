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

export const DayOfMonth = {
  lowerBound: 1,
  upperBound: 31,
};

export const Month = {
  lowerBound: 1,
  upperBound: 12,
};

export const DayOfWeek = {
  lowerBound: 0,
  upperBound: 7,
};
