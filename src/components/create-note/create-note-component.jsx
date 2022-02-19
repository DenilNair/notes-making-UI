import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Create = () => {
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
    console.log("in useState");
  });

  let [isLoggedIn, buttonStatus] = useState("enabled");
  let _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  function setContentState2() {
    buttonStatus("enable");
    console.log("state is changing ", isLoggedIn);
  }
  useEffect(() => {
    console.log(contentState, "- Has changed");
    setContentState2();
  }, [contentState]);
  var button;
  const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: "absolute",
      width: "100px",
      borderRadius: "10px",
      backgroundColor: "lightgreen",
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));
  function checkContent() {
    console.log(contentState);
  }

  function checkSubmit() {
    submit();

    console.log("submit check clicked");
  }

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("authorization", 'Client-ID 035750f765a6563');
      const data = new FormData();
      console.log("image data",file)
      data.append("image", file);
      xhr.onprogress = function () {
        console.log('LOADING', xhr.status);
    };
  
    xhr.onload = function () {
        console.log('DONE', xhr.status);
    };
    
      xhr.send(data);
      xhr.addEventListener('load', () => {
        //const response = JSON.parse(xhr.responseText);
        console.log("inside load")
        console.log("addevent response",xhr.responseText);
       // resolve(response);
      });
      xhr.addEventListener("error", () => {
        //const error = JSON.parse(xhr.responseText);
        console.log("inside error")
        console.log(xhr.responseText);
       // reject(error);
      });
    });
  }

  function submit() {
    let url = "http://localhost:10000/store-data";
    let data = contentState;
    console.log(data);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log("response from server",)
      result.json().then((res) => {
        console.warn("res", res);
      });
    });
  }
  const classes = useStyles();

  const renderAuthButton = () => {
    console.log("denil", isLoggedIn);
    if (isLoggedIn === undefined) {
      isLoggedIn = "disable";
    }
    console.log(isLoggedIn);
    if (isLoggedIn === "enable") {
      isLoggedIn = "disable";
      return (
        <Tooltip title="Add" aria-label="add" onClick={checkSubmit}>
          <Fab className={classes.absolute}>submit</Fab>
        </Tooltip>
      );
    } else {
      // buttonStatus("disable");
      return (
        <Tooltip title="Add" aria-label="add" disabled>
          <Fab className={classes.absolute}>submit</Fab>
        </Tooltip>
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">Start Writing</header>
      <Checkbox
        {...label}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
      />
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
      />
      <Editor
        defaultContentState={contentState}
        onContentStateChange={setContentState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
      />
      {renderAuthButton()}
    </div>
  );
};

export default Create;
