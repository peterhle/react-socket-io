import React, {useRef, useState, useEffect} from "react";
import {Paper, TextField, Button, makeStyles} from "@material-ui/core";

import useChat from "./useChatRoom";
import clsx from "clsx";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#263238"
  },
  paper: {
    width: "50em",
    height: "80%",
    position: "relative"
  },
  action: {
    display: "flex",
    width: "96%",
    alignItems: "center",
    margin: "1em",
    position: "absolute",
    bottom: 0
  },
  sendButton: {
    width: "10em",
    height: "50%",
    margin: "0 2em"
  },
  messageInput: {
    width: "100%"
  },
  messageContainer: {
    overflowY: "auto",
    height: "85%"
  },
  divider: {
    margin: "0.1em"
  },
  message:{
    listStyle: "none"
  },
  owner:{
    margin: "1em",
    backgroundColor: "#0091EA",
    padding: "0.5em 1.5em",
    borderRadius: "20px",
    color: "#FFF",
    wordBreak: "break-word",
    maxWidth: "65%",
    width: "fit-content",
    marginRight: "auto"
  },
  guest: {
    margin: "1em",
    backgroundColor: "#8BC34A",
    padding: "0.5em 1.5em",
    borderRadius: "20px",
    color: "#FFF",
    wordBreak: "break-word",
    maxWidth: "65%",
    width: "fit-content",
    marginLeft: "auto"
  },
  ol: {
    paddingInlineEnd: "40px"
  }
});

const Room = () => {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const classes = useStyles();
  const messageRef = useRef()

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyUp = event => {
    if (event.key === "Enter"){
      if (newMessage !== "") {
        sendMessage(newMessage);
        setNewMessage("");
      }
    }
  }

  useEffect(() => messageRef.current.scrollIntoView({behavior: "smooth"}))

  return (
    <div className={classes.container}>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.messageContainer}>
          <ol className={classes.ol}>
            {messages.map((message, i) => (
              <li
                key={i}
                className={clsx(classes.message, message.isOwner ? classes.owner : classes.guest)}
              >
                <span>{message.body}</span>
              </li>
            ))}
          </ol>
          <div ref={messageRef}></div>
        </div>
        <div className={classes.action}>
          <TextField
            className={classes.messageInput}
            id="message"
            label="Message"
            placeholder="enter message here"
            variant="outlined"
            value={newMessage}
            onChange={handleNewMessageChange}
            onKeyUp={handleKeyUp}
          />
          <Button
            disabled={!newMessage}
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            className={classes.sendButton}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Room;