import * as React from "react";
import { getWebSocketQapio } from "./qapio/WebSocket"
//import { w3cwebsocket as W3CWebSocket } from "websocket";

type msg = {interface: string, query: any};

function App() {
  
  const [socket, setSocket] = React.useState(null);
  const [data, setData] = React.useState<msg[]>([]);

  React.useEffect(() => { 
    getWebSocketQapio().then(v => {
      setSocket(v)});
  }, [])

  React.useEffect(() => {
    if(socket != null){
      socket.onmessage = (e:any) => {
        const newMsg = JSON.parse(e.data);
        const newMsgselect = newMsg.selections;
        setData(newMsgselect);
      };
    }
  })

  return (
    <React.Fragment>
      <h1>Websocket Test</h1>
    </React.Fragment>
  );
}

export default App;