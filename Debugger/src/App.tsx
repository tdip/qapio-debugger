import * as React from "react";
import { FixedSizeList as List } from 'react-window';
import { getWebSocketQapio } from "./WebSocket"
//import { w3cwebsocket as W3CWebSocket } from "websocket";

interface msg {selectionId: string, interface: string, query: any};

function App() {
  
  const [socket, setSocket] = React.useState(null);
  const [data, setData] = React.useState<msg[]>([]);
  const [count, setcount] = React.useState(1);

  React.useEffect(() => { 
    getWebSocketQapio().then(v => {
      setSocket(v)});
  }, [])

  React.useEffect(() => {
    if(socket != null && count == 1){
      socket.onmessage = (e:any) => {
        const newMsg = JSON.parse(e.data);
        const newMsgselect = newMsg.selections;
        setData(newMsgselect);
        setcount(0);
      };
      console.log(data)
    }
  })

  const Row = ({ index, style }) => (
    <div style={style}>{data[index].interface}</div>
  );
   
  const objectList = () => (
    <List
      height={500}
      itemCount={data.length}
      itemSize={50}
      width={500}
    >
      {Row}
    </List>
  );

  return (
    <React.Fragment>
      <h1>Websocket Test</h1>
      {objectList()}
    </React.Fragment>
  );
}

export default App;