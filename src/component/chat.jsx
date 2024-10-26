import React, { useEffect, useRef, useState } from 'react';
import useWebSocket, { appWebSocket } from '../hooks/useWebSocket';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const sock = new SockJS('http://localhost:8080/ws');
const stompClient = Stomp.over(sock);
const headers = {
    forceBinaryWSFrames: "true",
    appendMissingNULLonIncoming: "true",
}

stompClient.connect(headers, (frame) => {
    // connected = true;
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/messages', (greeting) => {
        const message = JSON.parse(greeting.body);
        // lastMessage = message;
    });
}, (error) => {
    console.error('Connection error: ', error);
});

const sendMessage = (message) => {
    if (!stompClient.connected) {
        return;
    }
    stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    // useEffect(() => {
    //     setMessages([...messages, lastMessage])
    // }, [lastMessage])

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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {/* <h2>Trạng thái kết nối: {connected ? 'Đã kết nối' : 'Chưa kết nối'}</h2> */}
            <h2>Tin nhắn nhận được:</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
