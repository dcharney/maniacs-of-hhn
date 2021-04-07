import React, { useState } from 'react';
import './style.css';

// function clickMe(){
//     alert('Add Recipe');
// }

// const FanContent = () => {


//     return (
//         <div className="fan">
//             <h2>Recipes</h2>
//             <button onClick={clickMe}>
//                 +
//             </button>

//         </div>

//     );

// };


function FanContent() {
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
          setSubmitting(false);
        }, 3000)
      }

    return(
        <div className="wrapper">
          <h1>Recipes</h1>
          {submitting &&
       <div>Submtting Form...</div>
     }
          <form onSubmit={handleSubmit}>
          <fieldset>
             <label>
               <p>Recipes Name</p>
               <input name="name" />
             </label>
           </fieldset>
           <button type="submit">Submit</button>
          </form>
        </div>
      )
    }

export default FanContent;