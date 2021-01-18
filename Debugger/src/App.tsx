import * as React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

function App() {

  const [msgserver, setMsgServer] = React.useState("");

  const onButtonClicked = () => {
    client.send(JSON.stringify({
      type: "message",
      msg: "sent from client"
    })
    );
  }

  React.useEffect(() => {
    client.onmessage = (message:any) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer);
      if (dataFromServer.type === "message") {
        setMsgServer(dataFromServer.msg);
      }
    };
  })

  return (
    <React.Fragment>
      <h1>Websocket Test</h1>
      <button onClick={onButtonClicked}>test</button>
      <h2>{msgserver}</h2>
    </React.Fragment>
  );
}

export default App;