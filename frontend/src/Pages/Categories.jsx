import React, { useEffect, useState } from 'react'
import Base from '../Components/Base'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from "reactstrap";
import NewFeed from "../Components/NewFeed";
import CategorySideMenu from "../Components/CategorySideMenu";
import { loadPostCategoryWise, deletePostService } from '../services/post-service';
import { toast } from "react-toastify";
import Post from '../Components/Post';

function Categories() {
  
    const [posts, setPosts] = useState([])
    const {categoryId} = useParams()
    useEffect(() => {
        loadPostCategoryWise(categoryId).then(data => {
            setPosts([...data])

        }).catch(error => {
            toast.error("Error while loading posts")
        })
    }, [categoryId])

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
    <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-3">
                    <CategorySideMenu></CategorySideMenu>
                </Col>
                <Col md={10}>
                    <h1>Blogs count ({posts.length})</h1>
                    {
                        posts && posts.map((post,index) => {
                            return (
                                <Post post={post} key={index} deletePost={deletePost}/> 
                            )
                        })
                    }

                    {posts.length <= 0 ? <h1>No posts in this category</h1> : ""}
                </Col>
            </Row>
            </Container>
    </Base>
  )
}

export default Categories
