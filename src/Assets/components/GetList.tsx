import React, {useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from '../images/user.svg'
import {Link} from 'react-router-dom'


 function GetList() {
    useEffect(()=>{
        fetchItems();
    },[]);


    const [persons,setPersons] = useState<any>([]);

    const fetchItems = async () =>{
        const data = await fetch('https://jsonplaceholder.typicode.com/users');

        const persons = await data.json()
        setPersons(persons)
        
    }

    return (
            <div className="container d-flex flex-wrap mt-4">
                {
                persons.map((person:any)=>
                <div className="d-flex p-4 col-md-6 col-lg-3 flex-wrap flex-1" key={person.id}>
                    <div className="card align-items-center fluid w-100 h-100 p-4"  >
                        <figure><img className="card-img-top" src={Image} alt="Card images cap"/></figure>
                        <div className="card-body">
                        <Link to={`/UserDetail/${person.id}`}><h5 className="card-title">{person.name}</h5></Link>
                        
                        <p className="card-text">{person.email}</p>
                        </div>
                    </div>
                </div>
                    )}
                                    
            </div>
            )
}
export default GetList




