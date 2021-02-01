import React,{useState,useEffect} from 'react'
import '../css/Modal.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Modal = ({close,postID}:any) =>{
    useEffect(()=>{
        fetchItems();
    },[]);
    
    const [comments, setComments] = useState<any>([])
    const fetchItems = async () =>{
        const data = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postID}`);
        const comments = await data.json()
        setComments(comments) 
    }

    const DeleteComment = (id:number)=>{
        
        if (window.confirm("Do you want to 'Delete' this comment?")) {
            deleteItems(id);

        }
    }       
    const deleteItems = async (id:number) =>{
        await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`,{
            method:'DELETE',
        });
    }


    const [sendPostId, setSendPostId] = useState({
        postId:postID,
        email:'',
        title:'',
        body:''
    })
    const submit = (e:any) => {
        e.preventDefault()
        fetch('https://jsonplaceholder.typicode.com/comments', {
          method: 'POST',
          body: JSON.stringify({ sendPostId }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => {
            if(res.status === 200 || res.status === 201)
            {
                alert("Your Comment Send Successfully!!")
                return res.json();     
            }
            })
          .then(json => setSendPostId(json.sendPostId))
          
      }
      

    

       return (
            <div className={"modal-wrapper"}>
                <div className={"modal-backdrop"} onClick={close}></div>
                <div className={"modal-box"}>
                    <button onClick ={()=>close()}  className="close-btn"></button>
                    <h1 className="text-info text-center pb-4">Related Comments</h1>
                    {
                        comments.map((comment:any)=>
                            <div className="card mb-3" key={comment.id}>
                                <button className="btn-danger deleteCommentBtn" onClick={()=>DeleteComment(comment.id)}>Delete This Comment</button>
                                <div className="card-header d-flex flex-column">
                                    <span className="text-dark"><b className="text-info">Email :</b> {comment.email}</span>
                                    <span className="text-dark"><b className="text-info">Title :</b> {comment.name}</span>
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                    <p>{comment.body}.</p>
                                    </blockquote>
                                </div>
                            </div>
                        )
                    }
                    <h1 className="text-info text-center pb-4">Send Comment to the Post</h1>
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email Adress</label>
                            <input type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            placeholder="Enter email"
                            name="user[email]"
                            value={sendPostId.email}
                            required
                            onChange={e => setSendPostId({ ...sendPostId, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" 
                            className="form-control" 
                            id="title" 
                            placeholder="Enter title"
                            name="user[title]"
                            value={sendPostId.title}
                            onChange={e => setSendPostId({ ...sendPostId, title: e.target.value })}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                            className="form-control" 
                            id="message" 
                            placeholder="Message" 
                            rows={5}
                            name="user[message]"
                            value={sendPostId.body}
                            onChange={e => setSendPostId({ ...sendPostId, body: e.target.value })}
                            minLength={10}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
 
}
    

export default Modal