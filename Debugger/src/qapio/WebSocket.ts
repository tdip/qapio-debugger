import { createGraphRunner } from "./QapioGraphRunner"

export const getWebSocketQapio = async () => {
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

