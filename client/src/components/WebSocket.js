import React, { useState } from "react";

const clientWS = new WebSocket(`ws://192.168.0.25:3300`, ["ws"]);

function WebSocketObj() {
  const [getMsg, setMsg] = useState("");

  clientWS.onopen = () => {
    console.log(`Connected to WS server`);
  };

    clientWS.onmessage = (msg) => {
      setMsg(msg.data);
      colorConverter();
      console.log(`State: `, msg.data);
    };

    const colorConverter = ()=> {
      let colorNumber = getMsg;
      console.log(`colorNumber: ${colorNumber}`);
    }

    const style = {
      backgroundColor: 'green'
    };
  
  return (
    <div>
      <h2>WebSocket connected:</h2>
      <p>{getMsg}CM</p>
      <div style={style}>this is some text</div>
    </div>
  );
}

export default WebSocketObj;
