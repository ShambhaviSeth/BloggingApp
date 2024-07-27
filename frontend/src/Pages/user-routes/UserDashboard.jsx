import { Container } from "reactstrap";
import AddPost from "../../Components/AddPost";
import Base from "../../Components/Base"
import { useEffect, useState } from "react";
import { getCurrentUserDetails } from "../../Auth";
import { deletePostService, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../Components/Post";

const UserDashboard = () => {

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        setUser(getCurrentUserDetails())
        loadPostData()
    }, [])

    function loadPostData() {
        loadPostUserWise(getCurrentUserDetails().id).then(data=>{
            setPosts([...data])
        }).catch(error => {
            toast.error("Something went wrong!")
        })
    }

    function deletePost(post) {
        deletePostService(post.postId).then(res => {
            toast.success("Post deleted successfully!")
            let newPosts = posts.filter(p => p.postId != post.postId)
            setPosts([...newPosts])

        }).catch(error => {
            toast.error("Error in deleting post")
        })
    }

    return (
        <Base> 
            <Container>
                <AddPost />
                <h1>Posts Count : ({posts.length})</h1>
                {posts.map((post,index) => {
                    return (
                        <Post post={post} key={index} deletePost={deletePost}></Post>
                    )
                })}
            </Container>
        </Base>
    )
}

export default UserDashboard;