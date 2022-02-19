import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
var parse = require("html-react-parser");


function View({ route, navigation }) {
  const location = useLocation();
  const [View1 = "", setView] = useState();
 const View2="";const View3="";
  console.log(location.state.name)
  useEffect(() => {

    submit();
   
    animals.map(item => (
   console.log(item.animal)
    ))
  });
  // var View1 = "dafsf";
  function submit() {
    if(location.state.id==='1'){
      let url = "http://localhost:10000/get-html";

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Work with JSON data here
        console.log(data);
        setView(data.name);
      })
      .catch((err) => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
    }
      else{

        let url = "http://localhost:10000/get-note-by-id/"+location.state.id;

        fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((response) => {
         //   console.log(response);
            return response.json();
          })
          .then((data) => {
            // Work with JSON data here
            console.log(data);
            console.log("html size",data.name.length)
            setView(data.name);
          })
          .catch((err) => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });

      }
    
  }
  const animals = [
    { id: 1, animal: View1.substring(0,10000) },
    { id: 2, animal:View1.substring(10000,20000)},
    { id: 3, animal: View1.substring(20000,30000) },
    { id: 4, animal: View1.substring(30000,40000)},
    { id: 5, animal:View1.substring(40000,View1.length)}
  ];

  return (
    <div>
      
    
      
    
      
      <h1>View Public Notes</h1>
      {animals.map(item => (
        <h1 key={item.id}>{parse(item.animal)}</h1>
      ))}
      
      
    </div>
  );
}
export default View;
