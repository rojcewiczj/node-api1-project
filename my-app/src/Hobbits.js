import React, { useState, useEffect } from "react";
import axios from "axios";

const Hobbits = () => {
const initialHobbit = {
    id:'',
    name: '',
    bio:'',
    created_at: '',
     updated_at :'',
  };
  
  const [hobbits, updateHobbit ] = useState();
      useEffect(() => {
        getData();
      }, []);
      const getData = () => {
      axios
          .get('api/users/')
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
    

      return (
         <div>


         </div>


      )
    
    
    }
    export default Hobbits;