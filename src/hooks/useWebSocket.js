import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let lastMessage;
let connected = false;




export const appWebSocket = {
    connected,
    lastMessage,
    // sendMessage
};