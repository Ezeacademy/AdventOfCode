
export default function resolution(input: string): [number, Array<string>] {
    let flag: number = 1;
    let cycle: number = 1;
    let ctr: number = 0;
    const instructionsStatus: Map<string, [number, number]> = new Map();
    const relevantCycles: Map<number, [number, string]> = new Map();
    let actualIndexKey: number;
    let keys: Array<number>;

    function executeInstruction(instruction: string, signalStrength: number): void {
        if(instructionsStatus.has(instruction)) {
            if (ctr == 40) { actualIndexKey++; ctr = 0; }
            const actualKey: number = keys.at(actualIndexKey)!!;
            const actualRow:  [number, string] = relevantCycles.get(actualKey)!!;
            const refreshedDisplay: string = actualRow[1].concat(actualRange().includes(ctr) ? "#" : ".");
            const signal: number = actualRow[0];

            if(relevantCycles.has(cycle)) {
                relevantCycles.set(actualKey, [actualKey * flag, refreshedDisplay]);
            } else {
                relevantCycles.set(actualKey, [signal, refreshedDisplay]);
            }

            const actualInstructionStatus: [number, number] = instructionsStatus.get(instruction)!;

            if(actualInstructionStatus[0] === actualInstructionStatus[1]) {
                flag = flag + signalStrength;
                actualInstructionStatus[1] = 0;
                instructionsStatus.set(instruction, actualInstructionStatus);
                cycle++;
                ctr++;
            } else {
                actualInstructionStatus[1]++;
                instructionsStatus.set(instruction, actualInstructionStatus);
                cycle++;
                ctr++;
                executeInstruction(instruction, signalStrength)
            }
        }
    }

    function actualRange() : Array<number> {
        const actualSpriteRange : Array<number> = new Array<number>();
        for (let i = -1; i < 2; i++) {
            actualSpriteRange.push(flag + i);
        }
        return actualSpriteRange;
    }

    function initializeContent(): void {
        relevantCycles.set(20, [0, ""]);
        relevantCycles.set(60, [0, ""]);
        relevantCycles.set(100, [0, ""]);
        relevantCycles.set(140, [0, ""]);
        relevantCycles.set(180, [0, ""]);
        relevantCycles.set(220, [0, ""]);
        instructionsStatus.set("addx", [1,0]);
        instructionsStatus.set("noop", [0,0]);
        keys = Array.from(relevantCycles.keys());
        actualIndexKey = 0;
    }

    function totalSumOfSignals(lines: string[]): [number, string[]] {
        initializeContent();
        lines.forEach(line => {
            const split : string[] = line.split(" ");
            const signal: number = isNaN(parseInt(split[1])) ? 0 : parseInt(split[1]);
            executeInstruction(split[0], signal);
        });

        return Array.from(relevantCycles.values()).reduce((accumulator: [number, Array<string>], currentValue: [number, string]) => {
            accumulator[0] = accumulator[0] + currentValue[0];
            accumulator[1].push(currentValue[1]);
            return accumulator;
        }, [0, []]);
    }

    const lines: string[] = input.split("\n");
    return totalSumOfSignals(lines);
}