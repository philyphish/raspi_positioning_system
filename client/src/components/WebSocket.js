import React, { useState } from "react";

const clientWS = new WebSocket(`ws://localhost:3300`, ["ws"]);

function WebSocketObj() {
  const [getMsg, setMsg] = useState("");

  clientWS.onopen = () => {
    console.log(`Connected to WS server`);
  };

    clientWS.onmessage = (msg) => {
      setMsg(msg.data);
      console.log(`State: `, msg.data);
    };
  
  return (
    <div>
      <h2>WebSocket connected:</h2>
      <p>{getMsg}</p>
    </div>
  );
}

export default WebSocketObj;
