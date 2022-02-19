/* eslint-disable no-undef */

import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

import {useNavigate} from 'react-router-dom';
let itemList = [];
 
const Home = () => {
  const navigate = useNavigate();


  function ReadMore(data){
    console.log("reading more",data);
    navigate("/view", {state:{id:data,name:'sabaoon'}});
  }
 
    function loadList(data){
        let items = [];
        
        console.log('inside fun',data)
        for(let i=0;i<data.block1.length;i++){
items.push(data.block1[i]._id);
        }
        
       itemList=[];
        items.forEach((item, index) => {
          itemList.push(
            <Card
              key={index}
              style={{
                width: window.width,
                backgroundColor: "rgb(250, 248, 225)",
                margin: "10px",
              }}
            >
              <CardContent>
                <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
                  Author
                </Typography>
                <Typography variant="h5" component="h2">
                  Title_{item}
                </Typography>
                <Typography
                  style={{
                    marginBottom: 12,
                  }}
                  color="textSecondary"
                >
                  Content
                </Typography>
                <Typography variant="body2" component="p">
                  Date and Reads
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" style={{ fontStyle: "bold" }} onClick={()=>ReadMore(item)}>
                  Read More....
                </Button>
              </CardActions>
            </Card>
          );
        });
        }
    const [View1="",setView]=useState();
    useEffect(()=>{
        getAllNotes();
    })
    function getAllNotes(){
        let url = "http://localhost:10000/get-all-notes";
        
    
        fetch(url, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          }).then(response => {
           
            return response.json();
          }).then(data => {
            // Work with JSON data here
            loadList(data);
            console.log(data);

           // setView( data.name);
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
        }


  return ( <div>{itemList}</div>);
};

export default Home;
