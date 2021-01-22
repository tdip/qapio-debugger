import * as React from "react";
import { FixedSizeList as List } from 'react-window';
import { getWebSocketQapio } from "./WebSocket"
//import { w3cwebsocket as W3CWebSocket } from "websocket";

interface msg {selectionId: string, interface: string, query: any};

function App() {
  
  const [socket, setSocket] = React.useState(null);
  const [data, setData] = React.useState<msg[]>([]);

  const newMessage = (msgs:msg[]) => {
    const oldId = data.map(x => x.selectionId);
    var oldData : msg[] = [];
    var newData : msg[] = [];
    for(let i = 0; i < msgs.length; i++){
      if(oldId.indexOf(msgs[i].selectionId)){
        oldData.push(msgs[i]);
      }else{
        newData.push(msgs[i])
      }
    }
    return oldData.concat(newData)
  };

  React.useEffect(() => { 
    getWebSocketQapio().then(v => {
      setSocket(v)});
  }, [])

  React.useEffect(() => {
    if(socket != null){
      socket.onmessage = (e:any) => {
        const newMsg = JSON.parse(e.data);
        const newMsgselect = newMsg.selections;
        setData(newMessage(newMsgselect));
      };
    }
  })

  const Row = ({ index, style }) => (
    <div style={style}>{`${index} ${data[index].selectionId} ${data[index].interface} ${data[index].query}`}</div>
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