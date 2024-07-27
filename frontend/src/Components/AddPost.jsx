import { useEffect, useRef, useState } from "react"
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../services/category-service"
import JoditEditor from "jodit-react"
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service"
import { getCurrentUserDetails } from "../Auth"
import { toast } from "react-toastify"

const AddPost = () => {

    const editor = useRef(null)
    const [categories, setCategories] = useState([])

    const [post, setPost] = useState({
        title: "",
        content: "",
        categoryId: -1
    })

    const [image, setImage] = useState(null)

    const [user, setUser] = useState(undefined)

    const fieldChanged = (event) => {
        setPost({...post, [event.target.name]:event.target.value})
    }

    const contentFieldChanged = (data) => {
        setPost({...post,'content': data})
    }

    useEffect(() => {
        setUser(getCurrentUserDetails())
        loadAllCategories().then((data) => {
            setCategories(data)
        }).catch(error => {
            toast.error(error)
        })
    },[])

    const createPost = (event) => {
        event.preventDefault()
        if(post.title.trim() === ''){
            toast.error("Post title is required")
            return
        }
        if(post.content.trim() === ''){
            toast.error("Post content is required")
            return
        }
        if(post.categoryId === ''){
            toast.error("Select some category")
            return
        }
        post['userId'] = user.id
        doCreatePost(post).then(data=>{

            uploadPostImage(image, data.postId).then(data => {
                toast.success("Image uploaded successfully")
            }).catch(error => {
                toast.error("Error while uploading image")
            })
            toast.success("Post created successfully")
            setPost({
                title: "",
                content: "",
                categoryId: -1
            })
        }).catch((error) => {
            toast.error("Post creation failed due to some issue")
        } )
    }

    const handleFileChange = (event) => {
        setImage(event.target.files[0])
    }

    return (
        <div className="wrapper">
            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    <h3>What's going on in your mind?</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" name='title' placeholder="Enter title for the post here" onChange={fieldChanged}>
                            </Input>
                        </div>
                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            <JoditEditor 
                                ref={editor}
                                value={post.content}
                                onChange={contentFieldChanged}
                            />
                        </div>
                        <div className="mt-3">
                            <Label for="image">Select post banner</Label>
                            <Input id="image" type="file" onChange={handleFileChange}></Input>
                        </div>
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" placeholder="Enter post content here" name="categoryId" onChange={fieldChanged} defaultValue={0}>
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
                            <Button type='submit' color="primary">Create Post</Button>
                            <Button className="ms-2" color="secondary">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost