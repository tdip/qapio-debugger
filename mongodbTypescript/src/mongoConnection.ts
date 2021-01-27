import { createGraphRunner } from "./qapio/QapioGraphRunner"

export const getMongoWebSockets = async (event:any) => {
    const handler = createGraphRunner();
    const instance = await handler.runGraph([
      {
        nodes: {
          database: {
              selection: {
                  interface: "Tdip.Qapio.Services.MongoDB.MongoDBFindInterface",
                  query: {
                      "database": "nessus"
                  }
              }
          },
          queries: {
              selection: {
                  interface: "Tdip.Qapio.Runtimes.Api.ProcessOutputStreamInterface"
              }
          },
          results: {
              selection: {
                  interface: "Tdip.Qapio.Runtimes.Api.ProcessInputStreamInterface"
              }
          }
        },
        edges: [
          {
              from: "queries",
              via: ["database"],
              to: "results"
          }
        ]
      }
    ]);

  const queries = instance.getStreamWebsocket("queries");
  
  const wss = instance.getStreamWebsocket("results");

  return({results: wss, query: queries})
  
}
