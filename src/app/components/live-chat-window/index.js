import React from 'react';
import Loader from './../loader/index.js';
import ChatViewer from './../chat-viewer/index.js';
import PreReqForm from './../pre-engagement/index.js';

import './scss/_agent-msg.scss';
import './scss/_chat-window.scss';
import './scss/_user-msg.scss';
import './scss/_user-window.scss';
import './scss/_view-toggle.scss';

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        // default state
        this.state = {
            'messages': []
        };
        this.postMessage = this.postMessage.bind(this);
        this.receiveMessages = this.receiveMessages.bind(this);
    };

    componentDidMount() {
        // fetch('http://localhost:3000/messages')
        //     .then((response) => response.json())
        //     .then(this.receiveMessages)
        //     .catch((error) => console.log(error));
    };

    postMessage(e) {
        e.preventDefault();
        fetch('http://172.18.42.20:6505/genesys/2/chat/retail-service',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify({
                    "from": {
                        "nickname": "Test user",
                        "participantId": 1,
                        "type": "Client"
                    },
                    "index": 4,
                    "text": this.text.value,
                    "type": "Message",
                    "utcTime": Date.now(),
                    "id": Date.now()
                })
            }).then(response => response.json())
            .then((data)=> {
                this.receiveMessages(data)
            })
            .catch((error) => console.log(error));
    };

    receiveMessages(data) {
        this.setState((prevState) => {
            return ({messages: prevState.messages.concat(data)})
        })
    };
    
    render() {                
        if(this.props.chatOpen) {
            return (
                <div className={this.props.chatOpen ? "chat-window" : "chat-window chat-window--open"}>

                    <PreReqForm />

                    {/* <div className="chat-window__agent">
                        <span><b>Firstname</b> Surname</span>
                    </div>
                    <button className="view-toggle">
                        <span className="view-toggle__line"></span>
                    </button>
                    <div className="chat-window__viewer">
                        <ChatViewer chatFeed={this.state} />                        
                        <Loader />
                    </div> */}
                    {/* <form className="user-window" onSubmit={this.postMessage}>
                        <div className="user-window__field-group">
                            <input type="text" placeholder="Type here" ref={(ref) => { this.text = ref }} className="user-window__msg-box" />
                            <button type="submit" className="user-window__send-msg">
                                <span className="user-window__send-msg-text">
                                    send message
                                </span>
                                <svg className="user-window__send-msg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                                    <path fill="#000222" d="M5.375 56v-18.625l40-5.375-40-5.375v-18.625l56 24z"></path>
                                </svg>
                            </button>
                        </div>
                    </form> */}
                </div>
            )
        } else {
            return false;
        }        
    }
}

export default ChatWindow;

