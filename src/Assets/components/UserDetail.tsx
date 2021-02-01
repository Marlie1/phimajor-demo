import React, {useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from '../images/user.svg'
// import {Link} from 'react-router-dom'
import Comments from './Comments'
// import ReactDOM from 'react-dom';
import { Modal }from 'react-bootstrap';

    

 function UserDetail({ match }:any) {
    useEffect(()=>{
        fetchItems();
    },[]);

    const [persons,setPersons] = useState<any>([]);
    const [personPosts,setPersonPosts] = useState<any>([]);
    const fetchItems = async () =>{
        const data = await fetch(`https://jsonplaceholder.typicode.com/users?id=${match.params.id}`);
        const persons = await data.json()
        setPersons(persons)
        const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${match.params.id}`);
        const personPosts = await posts.json()
        setPersonPosts(personPosts)
        
    }
    const [modalData,setModalData] = useState<any>({
        isOpen:false,
        postid:0
    });
   
    function closeModal(){
      setModalData({isOpen:false})
    }

    return (
            <div className="container d-flex flex-wrap mt-4 justify-content-center">
                {
                persons.map((person:any)=>
                <div className="d-flex p-4 col-md-12 col-lg-12 flex-wrap flex-1 " key={person.id}>
                    <div className="card align-items-center fluid w-100 h-100 p-4"  >
                        <figure><img className="card-img-top" src={Image} alt="Card images cap"/></figure>
                        <div className="card-body w-100 text-left ">
                            <h5 className="card-title"><b className="text-info">Name Surname :</b> {person.name}</h5>
                            <p className="card-text"><b className="text-info">Email :</b>{person.email}</p>
                            <p className="card-text "><b className="text-info">Address :</b> {person.address.street}, {person.address.suite}, {person.address.city}, {person.address.zipcode}</p>
                            <p className="card-text"><b className="text-info">Phone :</b> {person.phone}</p>
                            <p className="card-text"><b className="text-info">Website :</b> {person.website}</p>
                            <h5 className="card-title text-center"><b className="text-info">{person.name} Posts</b></h5>
                            {
                                personPosts.map((posts:any)=>
                                    <div className="card mb-3" key={posts.id}>
                                        <div className="card-header">
                                        <b className="text-info">Title :</b> {posts.title}
                                        </div>
                                        <div className="card-header">
                                        <b className="text-info">PostID :</b> {posts.id}
                                        </div>
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                            <p>{posts.body}.</p>
                                            <button className="btn-primary" onClick={()=>setModalData({postid:posts.id,isOpen:true})}>Show Related Comments</button>
                                            </blockquote>
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
                    )}
                        <Modal 
                            show={modalData.isOpen}
                            onHide={closeModal}
                            >
                            <Modal.Body>
                                <Comments close={closeModal} postID={modalData.postid}/>
                            </Modal.Body>
                        </Modal>              
            </div>
            )
}
export default UserDetail




