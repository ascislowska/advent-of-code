import * as fs from 'fs';

export const loadInput = (dayNumber: number): unknown => {
    return fs.readFileSync(`./input/day${dayNumber}.txt`).toString()
  };




