import input from "./input.txt?raw";
import type { Direction, Position } from "./types";

const NUMBER_OF_CLICKS = 100

const parseInput = (): string[] => {
   return input.toString().replace(" ", "").split("\n")

}

const isDirection = (text: string): text is Direction => {
    return text === "L" || text === "R"
}

export const parseRotation = (rotation: string): {clicks: number, direction: Direction} | undefined => {
    const clicks = Number(rotation.slice(1));
    const direction = rotation[0];

    if (isDirection(direction) && !isNaN(clicks)) {
        return {
            clicks,
            direction
        }
    }
}

export const countZerosDuringRotation = (initialPosition: Position, clicks: number, direction: Direction): number => {
    const fullRotations = Math.floor(clicks/100);
    const lastRotation = clicks % 100;
    const toZero = direction === "R" ? 100 - initialPosition : initialPosition;
    const passesZeroInLastRotation = !!initialPosition && lastRotation >= toZero;

    return fullRotations + (passesZeroInLastRotation ? 1 : 0)
}

export const rotate = (initialPosition: Position, clicks: number, direction: Direction): Position => {
    const calculatedPosition = direction === "R" ? initialPosition + clicks : initialPosition - clicks;
    const newPosition = calculatedPosition % 100
    if (newPosition < 0) {return NUMBER_OF_CLICKS + newPosition}

    return newPosition
}

export const countZeros = (rotations: string[]) => {
    let currentPosition = 50;
    let zerosAtTheEndOfRotation = 0;
    let zerosDuringRotation = 0;
    
    
    rotations.forEach(rotation => {
        const parsedRotation = parseRotation(rotation)
        
        if (!parsedRotation) {return;}
        const { direction, clicks } = parsedRotation;
        //count zeros during rotation
        const zerosToAdd = countZerosDuringRotation(currentPosition, clicks, direction)
        zerosDuringRotation += zerosToAdd
        
        //update the position and update zerosAtTheEndOfRotation
        currentPosition = rotate(currentPosition, clicks, direction)
        if (currentPosition === 0) {zerosAtTheEndOfRotation++;}
        
    })
    
    return {zerosAtTheEndOfRotation, zerosDuringRotation};
}

export const solution = (): {zerosAtTheEndOfRotation: number, zerosDuringRotation: number} => {    
    const rotations = parseInput()
    const solution = countZeros(rotations)
    console.log(solution);
    return solution
}