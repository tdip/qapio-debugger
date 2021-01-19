import * as React from "react";
import * as qapio from "./qapio";
import { w3cwebsocket as W3CWebSocket } from "websocket";

/*const client = new W3CWebSocket('ws://127.0.0.1:8000');*/
const start = async () => {

      const graphRunner = await qapio.createGraphRunner();
      const graph =  await graphRunner.runGraph([{
          nodes: {
              prices: {
                  selection: {
                      interface: "Tdip.Qapio.Services.Core.SubInterface",
                      query: {
                          topic: "price-events"
                      }
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
                  from: "prices",
                  to: "input"
              }
          ]
      }]);
      const ws = graph.getStreamWebsocket('input');
      console.log( ws);
    }

function App() {
  start();
  

  const [msgserver, setMsgServer] = React.useState(start());

  /*const onButtonClicked = () => {
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
    };;
  })*/

  return (
    <React.Fragment>
      <h1>Websocket Test</h1>
      {console.log("hello")}
    </React.Fragment>
  );
}

export default App;