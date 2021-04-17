import React from 'react';
import './style.css';
import mangoinferno from './images/mangoinferno.jpeg';
import vampirecurse from './images/vampirecurse.jpeg';
import loupgarou from './images/loupgarou.jpeg';
import ccorn from './images/ccorn.jpeg';


const FanContent = () => {
  
    const backendData = [
        { title: "Mango Inferno", description: "El Jimador Blanco tequila, mango and lime juices, yellow curry powder, agave nectar, salt, and topped with a jalapeño slice", location: "Skeleton Bar" },
        { title: "Vampire’s Curse", description: "Captain Morgan spiced rum, fruit punch, sour mix", location: "Signature Alcoholic Drinks" },
        { title: "Loup-Garou", description: "Pussers British Navy rum, Cruzan Dark, pineapple juice, honey, chamomile tea, lemon juice, pimento bitters", location: "Signature Alcoholic Drinks" },
        { title: "Frozen Candy Corn (non-alcoholic)", description: "Candy corn-flavored frozen beverage topped with whipped cream and sprinkles", location: "Cafe La Bamba" },
      ]
    
      const noteRootStyle = {
        border: "2px #BF3F36 solid",
        borderRadius: 9,
        margin: 20,
        backgroundColor: "#2E3638",
        padding: 6,

      };
    
      return (
        <div className="Inputinfo" style={{ width: 800 }}>
          <h1 className='FC'>Fan Content</h1>
          {backendData.map(ele => 
            <div style={noteRootStyle}>
              <p>{ele.img}</p>
              <h3 className='tline'>{ele.title}</h3>
              <p>{ele.description}</p>
              <div className="btns">
              <small>Location:{ele.location}</small>
              <button className="bb" type="button" class="btn btn" ><i class="fas fa-skull-crossbones" aria-hidden="true"></i></button>
                </div>
            </div>
          )}
          <div><p className='Content'>*Check out new food and drink recipes weekly from HHN</p></div>
          <div className="imgs">
                <img alt="" className='mi' src={mangoinferno}/>
                <img alt="" className='vc' src={vampirecurse}/>
                <img alt="" className='lg' src={loupgarou}/>
                <img alt="" className='cc' src={ccorn}/>
            </div>

        </div>
      )
    }



    export default FanContent;