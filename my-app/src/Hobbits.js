import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";
import './App.css'
const Hobbits = () => {
const initialHobbit = {
    
    name: '',
    bio:'',
  };
  
  const [hobbits, updateHobbit ] = useState([]);
      useEffect(() => {
        getData();
      }, []);
      const getData = () => {
      axiosWithAuth()
          .get('/users/')
          .then(res => updateHobbit(res.data))
          .catch(error => console.log(error));
      }
  
    console.log(hobbits);
    const [editing, setEditing] = useState(false);
    const [hobbitToEdit, setHobbitToEdit] = useState(initialHobbit);
  console.log("hobbit to edit", hobbitToEdit)
  console.log("initial hobbit", initialHobbit)
    const editHobbit = hobbit=> {
      setEditing(true);
      setHobbitToEdit(hobbit);
    }
    const saveEdit = e => {
        e.preventDefault();
         axiosWithAuth()
          .put(`/users/${hobbitToEdit.id}`, hobbitToEdit)
          .then(res => {
            console.log(res.data)
              getData();
          })
          .catch(err => console.log(err.response));
            
      };
      const createHobbit = e => {
        e.preventDefault();
     console.log(hobbitToEdit);
      axiosWithAuth()
       .post(`/users`, hobbitToEdit )
       .then(res => {
         console.log(res);
         getData();
       })
       .catch(err => console.log(err.response));
   }

   const deleteHobbit = hobbit => {
    console.log(hobbit);
     axiosWithAuth()
      .delete(`/users/${hobbit.id}`, hobbit.id)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => console.log(err.response));
  };
      return (
         <div>
             <div className="hobbit-container">
 {!editing && (
    <form onSubmit={createHobbit}>
     
          <legend>New Hobbit</legend>
         
          <label>
            Name:
            <input type="text"
              onChange={e =>
                setHobbitToEdit({
                  ...hobbitToEdit,
                  name: e.target.value})
              }
              value={hobbitToEdit.name}
            />
          </label>
          <label>
            Bio:
            <input type="text"
              onChange={e =>
                setHobbitToEdit({
                  ...hobbitToEdit,
                  bio: e.target.value})
              }
              value={hobbitToEdit.bio}
            />
          </label>
         
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        )}
        {editing && (
    <form onSubmit={saveEdit}>
     
          <legend> Edit The Hobbit {hobbitToEdit.name} </legend>
         
          <label>
            Name:
            <input type="text"
              onChange={e =>
                setHobbitToEdit({
                  ...hobbitToEdit,
                  name: e.target.value})
              }
              value={hobbitToEdit.name}
            />
          </label>
          <label>
            Bio:
            <input type="text"
              onChange={e =>
                setHobbitToEdit({
                  ...hobbitToEdit,
                  bio: e.target.value})
              }
              value={hobbitToEdit.bio}
            />
          </label>

         
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        )}

       </div> 
          <div className="list">
      <ul>
       {hobbits.map(hobbit => (
         <li id="sessionDate" key={hobbit.id} onClick={() => editHobbit(hobbit)}>
         <span>
           <span className="delete" onClick={() => deleteHobbit(hobbit)}>
           🔸
           </span>{" "}
           {hobbit.name}
         </span>
       </li>
        ))}
 </ul>  
 </div>
 </div>
      )
    
    
    }
    export default Hobbits;