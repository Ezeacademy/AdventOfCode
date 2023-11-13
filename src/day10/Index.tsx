import inputtxt from "../day10/input.txt";
import useInput from "../utils/hooks/useInput";
import resolution from "../day10/resolution";
import {useState} from "react";
import terminal_off from "../assets/terminal_off.png"
import terminal_on from "../assets/terminal_on.png"
import turnOffSound from "../assets/sounds/sound_turnOff.mp3"
import turnOnSound from "../assets/sounds/sound_turnOn.mp3"
import useSound from "use-sound";

export default function Day10(): JSX.Element {
    const result= useInput<[number, string[]]>(resolution, inputtxt) ?? []
    const [getTerminalStatus, setTerminalStatus] = useState(false);
    const [getBackgroundImage, setBackgroundImage] = useState(terminal_off);
    const [getSound, setSound] = useState(turnOnSound);
    const [play] = useSound(getSound);

    function turnOff(): void {
        setTerminalStatus(false);
        setBackgroundImage(terminal_off);
        setSound(turnOnSound);
        play();
    }

    function turnOn(): void {
        setTerminalStatus(true);
        setBackgroundImage(terminal_on);
        setSound(turnOffSound);
        play();
    }

    return result.length > 0 ? (
        <div id='terminal_display' className="background_day_10 blur-overlay" style={{backgroundImage: `url(${getBackgroundImage})`}}>
            <div id='display_content' >
                {getTerminalStatus &&
                    <div id='display_top_content' >
                        <p id='display_comtent_header' className="terminal_font">CAMBA (COOP) TERMLINK PROTOCOL </p>
                        <br/>
                        <p id='display_comtent_day' className="terminal_font">DÍA 10 COMPLETADO!</p>
                        <br/>
                        <p id='display_comtent_relevant_data' className="terminal_font">DATOS RELEVANTES:</p>
                        <p id='display_comtent_spliter_1' className="terminal_font">------------------------------------------------------------------------------</p>
                        <p id='display_comtent_result_1' className="terminal_font">LA SUMA DE LAS SEIS SEÑALES ES: {result[0]}</p>
                        <p id='display_comtent_spliter_2' className="terminal_font">------------------------------------------------------------------------------</p>
                        <p id='display_comtent_crt' className="terminal_font">CRT CODIFICADO</p>
                        {result[1].map((item, index) => (<p id={'display_comtent_crt_row_' + index}  style={{fontFamily: "monospace", color: "#57f9a3", letterSpacing: '5px', fontWeight: "bolder"}} key={index}>{item}</p>))}
                        <p id='display_comtent_spliter_3' className="terminal_font">------------------------------------------------------------------------------</p>
                    </div>}
                <div id='display_bottom_content' >
                    {getTerminalStatus ? <button className='terminal_button' id='terminal_button_on' onClick={turnOff}></button>
                                       : <button className='terminal_button' id='terminal_button_off' onClick={turnOn}></button>}
                </div>
            </div>
        </div>
    ) : (<div></div>);
}