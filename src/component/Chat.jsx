import React, {useEffect, useState} from 'react';
import useWebSocket from "../hooks/useWebSocket";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const {lastMessage, isConnected, sendMessage} = useWebSocket();

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    useEffect(() => {
        setMessages([...messages, lastMessage])
    }, [lastMessage])

    return (
        <div>
            <h1>WebSocket STOMP Chat</h1>
            <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Nhập tin nhắn"
            />
            <button onClick={() => sendMessage(inputMessage)}>Gửi</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
            <h2>Trạng thái kết nối: {isConnected ? 'Đã kết nối' : 'Chưa kết nối'}</h2>
            <h2>Tin nhắn nhận được:</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
