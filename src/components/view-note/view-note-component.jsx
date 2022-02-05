
import React, { useEffect, useState } from "react";
var parse = require('html-react-parser');   
function View(){
    const [View1="",setView]=useState();
    useEffect(()=>{
        submit();
    })
   // var View1 = "dafsf";
  function submit(){
    let url = "http://localhost:10000/get-html";
    

    fetch(url, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      }).then(response => {
        console.log(response);
        return response.json();
      }).then(data => {
        // Work with JSON data here
        console.log(data);
        setView( data.name);
      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
    }

    return (<div><h1>View Public Notes</h1> {parse(View1)}
    </div>)
}
export default View;