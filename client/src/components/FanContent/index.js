import React from "react";
import './style.css';

const FanContent = () => {

    const backendData = [
        { title: "Grocery List", description: "Milk, Soup, Bread", createdat: "01-18-2021" },
        { title: "Math Homework", description: "Remember to finish question 8-10 before monday", createdat: "12-01-2020" },
        { title: "Call James", description: "Ask him about the company party.", createdat: "12-30-2020" }
      ]
    
      const noteRootStyle = {
        border: "2px #0af solid",
        borderRadius: 9,
        margin: 20,
        backgroundColor: "#2E3638",
        padding: 6,

      };
    
      return (
        <div style={{ width: 800 }}>
          {backendData.map(ele => 
            <div style={noteRootStyle}>
              <h3>{ele.title}</h3>
              <p>{ele.description}</p>
              <div className="btns">
              <small>{ele.createdat}</small>
              <button type="button" class="btn btn"><i class="fas fa-comment" aria-hidden="true"></i></button>
              <button type="button" class="btn btn"><i class="far fa-thumbs-up" aria-hidden="true"></i></button>
                </div>
            </div>
          )}
        </div>
      )
    }



    export default FanContent;