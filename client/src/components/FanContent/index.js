import React, { useReducer, useState } from 'react';
import './style.css';


const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }


function FanContent() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
          setSubmitting(false);
        }, 3000)
      }

      const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
      }

    return(
        <div className="wrapper">
          <h1>Recipes</h1>
          {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
          <form onSubmit={handleSubmit}>
          <fieldset>
             <label>
               <p>Recipes Name:</p>
               <input className="recipe" name="name" onChange={handleChange}/>
             </label>
           </fieldset>
           <fieldset>
         <label>
           <p>Ingredients:</p>
           <input classname="ingredients" name="ingredients" onChange={handleChange}/>
           </label>
           </fieldset>
           <button type="submit">Submit</button>
          </form>
        </div>
      )
    }

export default FanContent;