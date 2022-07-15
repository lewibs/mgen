import React from "react";
import * as Tone from "tone";
import {playCord,makeMelody, executeMelody} from "./functions/generation/sounds";

function App() {
  const [cord, setCord] = React.useState("C4");
  
  function play() {
    let melody = makeMelody(new Tone.Synth().toDestination(), 1, 8, 8, 10, 15);
    let melody2 = makeMelody(new Tone.Synth().toDestination(), 10, 8, 8, 20, 30);
    
    let now = Tone.now();
    for (let i = 0; i < 10; i++) {
      executeMelody(melody2, 0.25, now);
      now = now + executeMelody(melody, 0.50, now);
    }
    //setTimeout(()=>{executeMelody(makeMelody(new Tone.Synth().toDestination(), 10, 20, 20, 10, 15))}, 0.5)
    //executeMelody(makeMelody(new Tone.Synth().toDestination(), 10, 4, 20, 20, 30));
    //executeMelody(makeMelody(new Tone.Synth().toDestination(), 10, 4, 20, 20, 30));
  }

  return (
    <center className="App">
      <label>
        cord: <br></br>
        <input
          placeholder={"note"}
          value={cord}
          onChange={(e)=>{setCord(e.target.value)}}
        />
      </label>
      <br></br>
      <button onClick={play}>
        test
      </button>
    </center>
  );
}

export default App;
