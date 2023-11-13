import {getInput} from "../utils/hooks/useInput";
import inputtxt from "../day9/input.txt";
import resolution, {MatrixElement} from "./resolution";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import React, {useEffect, useRef, useState} from "react";
import wood from "../assets/tablaMadera.png"

export default function Day9(): JSX.Element {
    const input = getInput<string>(inputtxt);
    const cache = useRef<Map<number, [MatrixElement[][], number]>>(new Map());
    const [getAmountOfKnots, setAmountOfKnots] = useState<number>(1);
    const [getCurrentPage, setCurrentPage] = useState<number>(1);
    const [contentTable , setContentTable] = useState<JSX.Element[]>([]);
    const rowsPerPage = 110;
    const indexOfLastRow = getCurrentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const down = () => { setCurrentPage(getCurrentPage + 1);}
    const up = () => { setCurrentPage(getCurrentPage - 1);}

    const generateContent = () => {
        const currentRows: MatrixElement[][] = cache.current.get(getAmountOfKnots)!![0].slice(indexOfFirstRow, indexOfLastRow);
        const generatedContent: JSX.Element[] = currentRows.map((row: MatrixElement[], rowIndex: number) => (
            <tr key={"Row" + rowIndex}>
                {row.map((element: MatrixElement, columnIndex: number) => {
                    let cellContent = undefined;
                    if (element.isKnot()) {
                        cellContent = (<img className="wood_icon_day_9" src={wood} alt="Wood_Icon"/>);
                    }
                    return (<td key={"Column" + rowIndex + columnIndex}>{cellContent}</td>);
                })}
            </tr>
        ));
        setContentTable(generatedContent);
    };

    const handleChangeAmountOfKnots = (event: { target: { value: any; }; }) => {
        setCurrentPage(1);
        setAmountOfKnots(event.target.value);
    };

    useEffect(() => {
        if(input && !cache.current.has(getAmountOfKnots)) {
            cache.current.set(getAmountOfKnots, resolution(input, getAmountOfKnots));
        }
        if(input && cache.current.has(getAmountOfKnots)) {
            generateContent();
        }
    }, [input, getAmountOfKnots, getCurrentPage]);

    return input ? (
        <div>
            <div className="flex gap-4 items-center">
                <p>Select the number of knots</p>
                <select id="selectAmountOfKnots" onChange={handleChangeAmountOfKnots} defaultValue={1}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                <p>
                    Tail movements: {cache.current.get(getAmountOfKnots)?.[1]}
                </p>
                <div className="pagination">
                    <button className={getCurrentPage === 1 ? "disabled-button" : "enabled-button"} disabled={getCurrentPage === 1} onClick={up} key={"UP"}>↑</button>
                    <button className={getCurrentPage === 4 ? "disabled-button" : "enabled-button"} disabled={getCurrentPage === 4} onClick={down} key={"DOWN"}>↓</button>
                </div>
            </div>

            <div className="background_day_9">
                <TransformWrapper>
                    <TransformComponent>
                        <table>
                            <tbody key={"Matrix" + getCurrentPage}>
                            {contentTable}
                            </tbody>
                        </table>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </div>
    ): (<div></div>);
}