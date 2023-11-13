import * as React from 'react';
import {Component, ReactNode} from "react";

const MS = {
    VERTICAL: 0,
    HORIZONTAL: 1,
}
const MD = {
    UP: -1,
    DOWN: 1,
    RIGHT: 1,
    LEFT: -1,
}

export abstract class MatrixElement extends Component<MatrixElementProps> {
    move(axis: number, direction: number, matrix: MatrixElement[][]): void {}
    render(): ReactNode { return <div>{this.props.children}</div>; }
    isKnot(): boolean { return false; }
}

interface MatrixElementProps {
    children: ReactNode;
}

class Knot extends MatrixElement {
    elementAHead: Knot | undefined;
    previousElement: Knot | undefined;
    visitedPositions: number[][] = [];
    assignedNumber: number;
    lastPosition: number[];
    isLast: boolean = false;
    actualPosition: number[];
    maxQuantityOfKnots: number;

    constructor(props:MatrixElementProps , position: number[], maxQuantityOfKnots: number, assignedNumber: number = 0, elementAHead: Knot | undefined) {
        super(props);
        this.elementAHead = elementAHead;
        this.actualPosition = position;
        this.maxQuantityOfKnots = maxQuantityOfKnots;
        this.assignedNumber = assignedNumber;
        this.lastPosition = position;
        this.visitedPositions.push(this.actualPosition.slice())
    }

    isKnot(): boolean { return true; }

    move(axis: number, direction: number, matrix: MatrixElement[][]): void {
        if(this.assignedNumber === 0) {
            this.markThePreviousPosition(matrix);
            this.actualPosition[axis] += direction;
            this.markTheCurrentPosition(matrix);
        } else {
            if (!this.theyAreInTheSamePosition() && !this.isInAdjacentPositions() && this.isACardinal()) {
                this.markThePreviousPosition(matrix);
                this.actualPosition = this.getMiddleCardinalCoord()!!;
                this.markTheCurrentPosition(matrix);
                if (this.lastPosition) {
                    this.recordVisit()
                }
            } else {
                if (!this.theyAreInTheSamePosition() && !this.isInAdjacentPositions() && this.isInDiagonalConnections()) {
                    this.markThePreviousPosition(matrix);
                    this.actualPosition = this.getCoordinateToMove()!!.slice();
                    this.markTheCurrentPosition(matrix);
                    if (this.lastPosition) {
                        this.recordVisit()
                    }
                } else {
                    if (!this.theyAreInTheSamePosition() && !this.isInAdjacentPositions() && this.isOutOfTheComfortZoneDiagonal()) {
                        this.markThePreviousPosition(matrix);
                        this.actualPosition = this.getMiddleDiagonalCoord(this.actualPosition.slice(), this.elementAHead!!.actualPosition.slice())!!;
                        this.markTheCurrentPosition(matrix);
                        if (this.lastPosition) {
                            this.recordVisit()
                        }
                    }
                }
            }
        }
        if(this.previousElement) { this.previousElement.move(axis,direction,matrix); }
    }

    theyAreInTheSamePosition() :boolean {
        return (this.actualPosition[0] === this.elementAHead!!.actualPosition[0]) &&
            (this.actualPosition[1] === this.elementAHead!!.actualPosition[1]);
    }

    wasInTheSame(): boolean {
        return this.actualPosition[0] === this.previousElement!!.actualPosition[0] &&
            this.actualPosition[1] === this.previousElement!!.actualPosition[1];
    }

    markThePreviousPosition(matrix :MatrixElement[][]): void {
        if(this.previousElement && this.wasInTheSame()) {
            matrix[this.actualPosition[0]][this.actualPosition[1]] = this.previousElement;
        } else {
            if(matrix[this.actualPosition[0]][this.actualPosition[1]] === this && !this.isLast) {
                const props: MatrixElementProps = {children: <div>E</div>};
                matrix[this.actualPosition[0]][this.actualPosition[1]] = new EEEE(props);
            }
        }
    }

    markTheCurrentPosition(matrix :MatrixElement[][]): void {
        matrix[this.actualPosition[0]][this.actualPosition[1]] = this
    }

    recordVisit(): void {
        const isElementInList = (list: number[][], element: number[]) =>
            list.reduce((accumulator: boolean, currentValue: number[]) => accumulator || ((currentValue[0] === element[0]) && (currentValue[1] === element[1])), false);

        if(!isElementInList(this.visitedPositions.slice(), this.actualPosition.slice())) {
            this.visitedPositions.push(this.actualPosition.slice());
        }
    }

    getMiddleDiagonalCoord(coord1: number[], coord2: number[]): number[] | undefined {
        const [x1, y1] = coord1;
        const [x2, y2] = coord2;

        const middleX = (x1 + x2) / 2;
        const middleY = (y1 + y2) / 2;

        if (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 2) {
            return [middleX, middleY];
        }
    }

    getCoordinateToMove(): number[] | undefined {
        function getCoordinateToMove(coord: number[], coordList: number[][]): number[] | undefined {
            const [x, y]: number[] = coord;
            const adjacentCoords: number[][] = [[x-1, y], [x+1, y], [x, y-1], [x, y+1]];

            for (let i: number = 0; i < adjacentCoords.length; i++) {
                const adjCoord: number[] = adjacentCoords[i];
                if (coordList.some(c => c[0] === adjCoord[0] && c[1] === adjCoord[1])) {
                    return adjCoord;
                }
            }
        }
        return getCoordinateToMove(this.elementAHead!!.actualPosition.slice(), this.getAdjacentCoords(this.actualPosition.slice()))
    }

    getAdjacentCoords(coord: number[]): number[][] {
        const x: number = coord[0];
        const y: number = coord[1];

        const adjacentCoords: number[][] = [];

        for (let i: number = x - 1; i <= x + 1; i++) {
            for (let j: number = y - 1; j <= y + 1; j++) {
                if (i === x && j === y) {
                    continue;
                }
                adjacentCoords.push([i, j]);
            }
        }

        return adjacentCoords;
    }

    getMiddleCardinalCoord(): number[] | undefined {
        const [x1, y1]: number[] = this.actualPosition.slice();
        const [x2, y2]: number[] = this.elementAHead!!.actualPosition.slice();

        if (x1 === x2 || y1 === y2) {
            const middleX: number = (x1 + x2) / 2;
            const middleY: number = (y1 + y2) / 2;

            return [middleX, middleY];
        }
    }

    isElementInList = (list: number[][], element: number[]) =>
        list.reduce((accumulator: boolean, currentValue: number[]) => accumulator || ((currentValue[0] === element[0]) && (currentValue[1] === element[1])), false);


    isInAdjacentPositions(): boolean {
        return this.isElementInList(this.getAdjacentCoords(this.actualPosition.slice()), this.elementAHead!!.actualPosition.slice());
    }

    isACardinal(): boolean {
        function obtenerCoordenadas(x: number, y: number): number[][] {
            const coordenadas: number[][] = [];
            coordenadas.push([x - 2, y]);
            coordenadas.push([x + 2, y]);
            coordenadas.push([x, y - 2]);
            coordenadas.push([x, y + 2]);

            return coordenadas;
        }

        return this.isElementInList(obtenerCoordenadas(this.actualPosition.slice()[0], this.actualPosition.slice()[1]), this.elementAHead!!.actualPosition.slice());
    }

    isInDiagonalConnections(): boolean {
        function getDiagonalConnections(x : number, y: number): number[][] {
            const coordinates: [number, number][] = [];

            for (let i: number = x - 2; i <= x + 2; i++) {
                for (let j: number = y - 2; j <= y + 2; j++) {
                    const distance: number = Math.max(Math.abs(i - x), Math.abs(j - y));
                    if (distance === 2 && !(i === x || j === y) && Math.abs(i - x) !== Math.abs(j - y)) {
                        coordinates.push([i, j]);
                    }
                }
            }

            return coordinates;
        }

        return this.isElementInList(getDiagonalConnections(this.actualPosition.slice()[0], this.actualPosition.slice()[1]), this.elementAHead!!.actualPosition.slice());
    }

    isOutOfTheComfortZoneDiagonal(): boolean {
        function getDiagonalCoordinatesWithinTwoSteps(x : number, y: number): number[][] {
            const coordinates: [number, number][] = [];

            for (let i: number = x - 2; i <= x + 2; i++) {
                for (let j: number = y - 2; j <= y + 2; j++) {
                    const distance: number = Math.max(Math.abs(i - x), Math.abs(j - y));
                    if (distance === 2 && i !== x && j !== y) {
                        const dx: number = Math.abs(x - i);
                        const dy: number = Math.abs(y - j);
                        if (dx === 2 && dy === 2) {
                            coordinates.push([i, j]);
                        }
                    }
                }
            }

            return coordinates;
        }

        return this.isElementInList(getDiagonalCoordinatesWithinTwoSteps(this.actualPosition.slice()[0], this.actualPosition.slice()[1]), this.elementAHead!!.actualPosition.slice());
    }
}

class EEEE extends MatrixElement {
}


export default function resolution(input: string, maxQuantityOfKnots: number): [MatrixElement[][], number] {
    function dimensionWithFrom(listOfMovements: string[], directions: string[]): number[] {

        const distancesToOriginFrom = function (directions: string[], result: number[], value: string) {
            const splitValue: string[] = value.split(" ");

            switch (splitValue[0]) {
                case directions[0]: {
                    result[0] -= Number(splitValue[1]);
                    break;
                }
                case directions[1]: {
                    result[0] += Number(splitValue[1]);
                    break;
                }
                default: {
                    return result;
                }
            }

            if (result[0] >= 0 && result[0] > result[2]) {
                result[2] = result[0];
            }
            if (result[0] <= 0 && Math.abs(result[0]) > result[1]) {
                result[1] = Math.abs(result[0]);
            }
            return result;
        };

        return listOfMovements.reduce(distancesToOriginFrom.bind(null, directions), [0, 0, 0]).slice(1);
    }

    function moveAndPlaceBasedOn(movement :string, knot: Knot, matrix: MatrixElement[][]): void {
        const splitMovement: string[] = movement.split(" ");
        switch (splitMovement[0]) {
            case "L": {
                for (let i :number = 1; i <= Number(splitMovement[1]); i++) {
                    knot.move(MS.HORIZONTAL, MD.LEFT, matrix);
                }
                break;
            }
            case "R": {
                for (let i :number = 1; i <= Number(splitMovement[1]); i++) {
                    knot.move(MS.HORIZONTAL, MD.RIGHT, matrix);
                }
                break;
            }
            case "D": {
                for (let i :number = 1; i <= Number(splitMovement[1]); i++) {
                    knot.move(MS.VERTICAL, MD.DOWN, matrix);
                }
                break;
            }
            case "U": {
                for (let i :number = 1; i <= Number(splitMovement[1]); i++) {
                    knot.move(MS.VERTICAL, MD.UP, matrix);
                }
                break;
            }
        }
    }

    function createMatrix(lines: string[]): [MatrixElement[][], number[]] {
        const props: MatrixElementProps = {children: <div>E</div>};
        const sum = function (accumulator: number, currentValue: number) {
            return accumulator + currentValue;
        }

        const verticalDistances: number[] = dimensionWithFrom(lines, ["U", "D"]);
        const horizontalDistances: number[] = dimensionWithFrom(lines, ["L", "R"]);
        const high: number = verticalDistances.reduce(sum, 1);
        const width: number = horizontalDistances.reduce(sum, 1);
        const matrix: MatrixElement[][] = Array.from({length: high}, () => Array(width).fill(new EEEE(props)));
        return [matrix, [verticalDistances[0], horizontalDistances[0]]];
    }

    function initializeRope(initialPosition: number[], matrix: MatrixElement[][], maxQuantityOfKnots: number): Knot[] {
        const props: MatrixElementProps = {children: <div>K</div>};
        const firstKnot: Knot = new Knot(props, initialPosition.slice(), maxQuantityOfKnots, 0, undefined);
        let currentKnot: Knot = firstKnot;
        for (let i = currentKnot.assignedNumber; i < maxQuantityOfKnots; i++) {
            const nextKnot: Knot = new Knot(props, initialPosition.slice(), maxQuantityOfKnots, i + 1, currentKnot);
            currentKnot.previousElement = nextKnot;
            currentKnot = nextKnot;
        }

        currentKnot.isLast = true;

        return [firstKnot,currentKnot];
    }

    function numberOfQueueOccurrences(lines: string[], initialPosition: number[], matrix: MatrixElement[][], maxQuantityOfKnots: number): [MatrixElement[][], number] {
        const resultInitialize: Knot[] = initializeRope(initialPosition, matrix, maxQuantityOfKnots);
        let firstKnot: Knot = resultInitialize[0];
        let lastKnot: Knot = resultInitialize[1];
        for (let i = 0; i < lines.length; i++) {
            moveAndPlaceBasedOn(lines[i], firstKnot, matrix);
        }
        return [matrix, lastKnot.visitedPositions.length];
    }

    const lines: string[] = input.split("\n");
    const resultOfCreation: [MatrixElement[][], number[]] = createMatrix(lines);
    return numberOfQueueOccurrences(lines, resultOfCreation[1], resultOfCreation[0], maxQuantityOfKnots);
}