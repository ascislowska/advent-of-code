import { describe, expect, it } from "vitest";
import { countZeros, countZerosDuringRotation, parseRotation, rotate } from "./rotate";
describe("parseRotation", () => {
    it("should parse L10", () => 
        expect(parseRotation("L10")).toStrictEqual({
            direction: "L",
            clicks: 10
        })
    )

    it("should parse R100", () => 
        expect(parseRotation("R100")).toStrictEqual({
            direction: "R",
            clicks: 100
        })
    )
})
describe("rotate", () => {
    it.each([
        [0, 10, "R", 10],
        [0, 100, "R", 0],
        [1, 99, "R", 0],
        [99, 1, "R", 0],
        [1, 1, "L", 0],
        [1, 2, "L", 99],
         [0, 210, "R", 10],
    ]as const)('for initialPosition %i, clicks %i and direction %s, should return %i', (initialPosition, clicks, direction, expected) => {
        expect(rotate(initialPosition, clicks, direction)).toBe(expected)
    })
})


describe("countZeros", () => {
    describe("zerosAtTheEndOfRotation", () => {
        it("test case", () => {
            const rotations = ['L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82'];
            expect(countZeros(rotations).zerosAtTheEndOfRotation).toBe(3)
        })
        it("should handle more than 100", () => {
            const rotations = ['L150'];
            expect(countZeros(rotations).zerosAtTheEndOfRotation).toBe(1)
        })
    })
     describe("zerosDuringRotation", () => {
        it("test case", () => {
            const rotations = ['L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82'];
            expect(countZeros(rotations).zerosDuringRotation).toBe(6)
        })
    describe("direction is R", () => {
        it("should handle more than 100", () => {
            const rotations = ['R120'];
            expect(countZeros(rotations).zerosDuringRotation).toBe(1)
        })

        it("should handle more than 200", () => {
            const rotations = ['R120', 'R50'];
            expect(countZeros(rotations).zerosDuringRotation).toBe(2)
        })
    })
    describe("direction is L", () => {
        it("should handle more than 100", () => {
            const rotations = ['L120'];
            expect(countZeros(rotations).zerosDuringRotation).toBe(1)
        })

        it("should handle more than 200", () => {
            const rotations = ['L120', 'L50'];
            expect(countZeros(rotations).zerosDuringRotation).toBe(2)
        })

         it("should handle less than 100", () => {
            const rotations = ['L70'];
            expect(countZeros(rotations).zerosDuringRotation).toBe(1)
        })
    })
    describe("both directions", () => {
        it("should handle more than 100", () => {
            const rotations = ['L70', 'R110'];
            expect(countZeros(rotations).zerosDuringRotation).toBe(2)
        })

        it("should handle more than 200", () => {
            const rotations = ['R70', 'L50'];
            expect(countZeros(rotations).zerosDuringRotation).toBe(2)
        })
    })
    })
    
})

describe("countZerosDuringRotation", () => {
    describe("when direction is right", () => {
        it("less clicks than distance to zero", () => {
            const zerosDuringRotation = countZerosDuringRotation(0, 10, "R")
            expect(zerosDuringRotation).toBe(0)
        })
        it("more clicks than distance to zero", () => {
            const zerosDuringRotation = countZerosDuringRotation(0, 110, "R")
            expect(zerosDuringRotation).toBe(1)
        })

        it("more clicks than one rotation", () => {
            const zerosDuringRotation = countZerosDuringRotation(0, 210, "R")
            expect(zerosDuringRotation).toBe(2)
        })
        it("exact number to zero", () => {
            const zerosDuringRotation = countZerosDuringRotation(50, 50, "R")
            expect(zerosDuringRotation).toBe(1)
        })
    } )

    describe("when direction is left", () => {
        it("less clicks than distance to zero", () => {
            const zerosDuringRotation = countZerosDuringRotation(10, 1, "L")
            expect(zerosDuringRotation).toBe(0)
        })
        it("more clicks than distance to zero", () => {
            const zerosDuringRotation = countZerosDuringRotation(50, 70, "L")
            expect(zerosDuringRotation).toBe(1)
        })

         it("more clicks than one rotation", () => {
            const zerosDuringRotation = countZerosDuringRotation(10, 200, "L")
            expect(zerosDuringRotation).toBe(2)
        })

        it("exact number to zero", () => {
            const zerosDuringRotation = countZerosDuringRotation(50, 50, "L")
            expect(zerosDuringRotation).toBe(1)
        })

        it("rotates from 0", () => {
            const zerosDuringRotation = countZerosDuringRotation(0, 50, "L")
            expect(zerosDuringRotation).toBe(0)
        })
    } )
})
