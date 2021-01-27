import * as React from "react";
import ReactJson from 'react-json-view'
import { getMongoWebSockets } from "./mongoConnection";
import "./styles/styles.scss";

function App() {
  const [socket, setSocket] = React.useState(null);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getMongoWebSockets("load").then((v) => {
      setSocket(v);
    });
  }, []);

  React.useEffect(() => {
    if (socket != null) {
      socket.results.onmessage = (e: any) => {
        const newMsg = JSON.parse(e.data);
        setData(newMsg);
        console.log(newMsg);
      };
    }
  });

  const sendMsg = () => {
    console.log(socket.s);
    if (socket != null) {
      console.log(socket.s);
      socket.query.send(
        JSON.stringify({
          collection: "nessus_report",
        })
      );
    }
  };

  /*const vulnerabilities = (
      data.map((id, index) =>
        <div>
            <h2 key={index}>{JSON.stringify(id._id)} vulnerabilities:</h2>
            {id.vulnerabilities.map((v, index) => <div key={index}><label>{`${index} ${JSON.stringify(v)}`}</label><br/><br/></div> )}
        </div>
        )
  )*/

  const vulnerabilities = (
    data.map((id, index) => <div><ReactJson src={id} collapsed={true} name={id._id.$oid} theme="colors" key={index}/><br/></div>)
  )
  
  return (
    <React.Fragment>
      <h1>mongo test</h1>
      <button disabled={socket == null ? true : false} onClick={sendMsg}>Get results</button>
      <br/><br/>
      {vulnerabilities}
    </React.Fragment>
  );
}

export default App;
