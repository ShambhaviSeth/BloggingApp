import React, { useContext, useEffect, useRef, useState } from 'react'
import Base from '../Components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { loadPost , updatePost as doUpdatePost} from '../services/post-service'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import JoditEditor from "jodit-react"
import { loadAllCategories } from "../services/category-service"

function UpdateBlog() {

    const {blogId} = useParams()
    const object = useContext(UserContext)
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const editor = useRef(null)

    const [post, setPost] = useState(null)

    useEffect(()=>{
        loadAllCategories().then((data) => {
            setCategories(data)
        }).catch(error => {
            toast.error(error)
        })
        loadPost(blogId).then(data => {
            setPost({...data, categoryId: data.category.categoryId})
        }).catch(error => {
            toast.error("Error while loading the blog")
        })
    }, [])

    useEffect(()=>{
        if(post){
            if(post.user.id != object.user.data.id){
                toast.error("This is not your post hence you cant edit it")
                navigate("/")
            }
        }

    }, [post])

    const handleChange = (event, fieldName) => {
        setPost({
            ...post,
            [fieldName]: event.target.value
        })
    }

    const updatePost = (event)=>{
        event.preventDefault()
        doUpdatePost({...post, category: {categoryId: post.categoryId}}, post.postId).then(res => {
            toast.success("Post updated successfully")
        }).catch(error => {
            toast.error("Post update failed")
        })
    }

    const updateHtml = () => {
        return (
            <div className="wrapper">
            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    <h3>Update post </h3>
                    <Form onSubmit={updatePost}>
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" name='title' placeholder="Enter title for the post here" onChange={(event)=>handleChange(event, "title")} value={post.title}>
                            </Input>
                        </div>
                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            <JoditEditor 
                                ref={editor}
                                value={post.content}
                                onChange={newContent => setPost({...post, content: newContent})}
                            />
                        </div>
                        <div className="mt-3">
                            <Label for="image">Select post banner</Label>
                            <Input id="image" type="file" onChange={''}></Input>
                        </div>
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" placeholder="Enter post content here" name="categoryId" onChange={(event)=> handleChange(event, "categoryId")} value={post.categoryId}>
                                <option disabled value={0}>--- Select category ---</option>
                                {
                                    categories.map((category) => (
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))
                                }
                            </Input>
                        </div>
                        <Container className="text-center">
                            <Button type='submit' color="primary">Update Post</Button>
                            <Button className="ms-2" color="secondary">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
        )
    }

  return (
    <Base>
        <Container>
        { post && updateHtml()}
        </Container>
    </Base>
  )
}

export default UpdateBlog
