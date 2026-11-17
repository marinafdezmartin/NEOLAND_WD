import { StateSchema, MessagesValue } from "@langchain/langgraph";

// StateSchema define messages; MessagesValue combina los mensajes de cada paso.
// Los nuevos se acumulan y los que repiten identificador actualizan el anterior.
const MiEstado = new StateSchema({ messages: MessagesValue });

// Mostramos los campos del esquema: definirlo todavía no crea un grafo ni una conversación.
console.log(Object.keys(MiEstado.fields));
