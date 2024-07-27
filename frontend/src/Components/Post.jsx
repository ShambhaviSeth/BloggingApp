import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, CardText } from "reactstrap"
import { getCurrentUserDetails, isLoggedIn } from "../Auth"
import UserContext from "../context/UserContext"

function Post({post={ title:"This is default title", content: "This is default content"}, deletePost}) {

    const userContextData = useContext(UserContext)
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)
    useEffect(()=>{
        setUser(getCurrentUserDetails())
        setLogin(isLoggedIn())
    }, [])
    return (
        <Card className="border-0 shadow-sm mt-3">
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{__html: post.content.substring(0,50)+"..."}}>
                    
                </CardText>
                <div>
                    <Link to={'/posts/' + post.postId} className="btn btn-secondary">Read More</Link>
                    {
                        userContextData.user.login && (user && user.id == post.user.id && <Button onClick={()=>deletePost(post)} color="danger" className="ms-2">Delete</Button>) 
                    }
                                        {
                        userContextData.user.login && (user && user.id == post.user.id && <Button tag={Link} to={`/user/update-blog/${post.postId}`} color="warning" className="ms-2">Update</Button>) 
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default Post