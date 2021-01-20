import * as React from "react";
//import * as qapio from "./qapio";
import { w3cwebsocket as W3CWebSocket } from "websocket";

/*const client = new W3CWebSocket('ws://127.0.0.1:8000');*/

import { createGraphRunner } from "./qapio"
const start = async () => {
  const handler = createGraphRunner();
  const instance = await handler.runGraph([
    {
      nodes: {
        status: {
            selection: {
                interface: "Tdip.Qapio.Services.Debug.SelectionDebug",
            }
        },
        input: {
            selection: {
                interface: "Tdip.Qapio.Runtimes.Api.ProcessInputStreamInterface"
            }
        }
      },
      edges: [
        {
            from: "status",
            to: "input"
        }
      ]
    }
  ]);
  const wss = instance.getStreamWebsocket("input");
  return wss;
}

function App() {

  const [socket, setSocket] = React.useState(null);
  const [msg, setMsg] = React.useState([]);

  React.useEffect(() => {
    start().then(v => {
      setSocket(v)});
  }, [])

  React.useEffect(() => {
    if(socket != null){
      socket.onmessage = (e:any) => {
        const newMsg = JSON.parse(e.data);
        
        setMsg([...msg, newMsg]);
      };
      console.log(msg);
      
    }
  })

  var messages = msg.map((m, index) => <label key={index}>new message</label>)

  return (
    <React.Fragment>
      <h1>Websocket Test</h1>
      {messages}
    </React.Fragment>
  );
}

export default App;