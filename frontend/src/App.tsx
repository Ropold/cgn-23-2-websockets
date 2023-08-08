import './App.css'
import {useEffect, useState} from "react";

function App() {

    const [text, setText] = useState<string>("")

    const [messages, setMessages] = useState<string[]>([])

    const [webSocket, setWebSocket] = useState<WebSocket>()

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080/api/ws/chat")
        ws.onmessage = onMessage
        setWebSocket(ws)
    }, [])

    function sendMessage(message: string) {
        webSocket?.send(message)
    }

    function onMessage(event: MessageEvent) {
        setMessages(prevState => [...prevState, event.data])
    }

    return (
        <>
            {messages.map(message => <p>{message}</p>)}

            <input value={text} onChange={event => setText(event.target.value)}/>
            <button onClick={() => {
                sendMessage(text)
                setText("")
                setMessages(prevState => [...prevState, text])
            }}>Send
            </button>
        </>
    )
}

export default App
