import React from "react";
import './style.css';
import { useHistory } from "react-router-dom";


const FanContent = () => {
    const history = useHistory();

    const backendData = [
        { title: "Mango Inferno", description: "El Jimador Blanco tequila, mango and lime juices, yellow curry powder, agave nectar, salt, and topped with a jalapeño slice", createdat: "04-05-2021" },
        { title: "Vampire’s Curse", description: "Captain Morgan spiced rum, fruit punch, sour mix", createdat: "04-01-2021" },
        { title: "Loup-Garou", description: "Pussers British Navy rum, Cruzan Dark, pineapple juice, honey, chamomile tea, lemon juice, pimento bitters", createdat: "03-30-2021" },
        { title: "Frozen Candy Corn (non-alcoholic)", description: "candy corn-flavored frozen beverage topped with whipped cream and sprinkles", createdat: "03-20-2021" },
      ]
    
      const noteRootStyle = {
        border: "2px #BF3F36 solid",
        borderRadius: 9,
        margin: 20,
        backgroundColor: "#2E3638",
        padding: 6,

      };

    const handleRoute = () =>{ 
        history.push("/Comment");
      }
    
      return (
        <div className="Inputinfo"style={{ width: 800 }}>
          {backendData.map(ele => 
            <div style={noteRootStyle}>
              <h3>{ele.title}</h3>
              <p>{ele.description}</p>
              <div className="btns">
              <small>{ele.createdat}</small>
              <button type="button" class="btn btn" onClick={handleRoute}><i class="fas fa-comment" aria-hidden="true"></i></button>
              {/* <button type="button" class="btn btn"><i class="far fa-thumbs-up" aria-hidden="true"></i></button> */}
                </div>
            </div>
          )}
        </div>
      )
    }



    export default FanContent;