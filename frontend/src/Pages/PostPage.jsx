import { Link, useParams } from "react-router-dom"
import Base from "../Components/Base"
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import { useEffect, useState } from "react"
import { createComment, loadPost } from "../services/post-service"
import { toast } from "react-toastify"
import { BASE_URL } from "../services/helper"
import { isLoggedIn } from "../Auth"

const PostPage = () => {
    const {postId} = useParams()

    const [post, setPost] = useState(null)

    const [comment, setComment] = useState({
        content: ''
    })

    useEffect(() => {
        loadPost(postId).then(data => {
            setPost(data)
        }).catch(error => {
            toast.error("Something went wrong while loading posts")
        })
    }, [])

    const printDate = (numbers) => {
        return new Date(numbers).toLocaleDateString()
    }

    const submitPost = () => {
        if(!isLoggedIn()){
            toast.error("Please login to add a comment")
            return
        }
        if(comment.content.trim() === ''){
            return
        }
        createComment(comment, post.postId).then((data) => {
            toast.success("Comment added successfully!")
            setPost({
                ...post,
                comments: [...post.comments, data.data]
            })
            setComment({
                content: ''
            })
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Base>
            <Container className="mt-4 shadow-sm">
                <Link to="/">Home</Link> / {post && (<Link to="">{post.title}</Link>)}
                <Row>
                    <Col md={{
                        size: 12
                    }}>
                        {
                            (post) && (
                                <Card className="mt-3">
                            <CardBody>
                                <CardText>Posted By <b>{post?.user.name}</b> on <b>{printDate(post.addedDate)}</b></CardText>
                                <CardText>
                                    <span className="text-muted">{post.category.categoryTitle}
                                    </span>
                                </CardText>
                                <div className="divider" style={{
                                    width: '100%',
                                    height: '1px',
                                    background:'#e2e2e2'
                                }}></div>
                                <CardText className="mt-3">
                                    <h1> {post.title} </h1>
                                </CardText>
                                <div className="img-container mt-3" style={{maxWidth: '50%'}}>
                                    <img className="img-fluid" src={ BASE_URL + "/post/image/" + post.imageName} alt=""></img>
                                </div>
                                <CardText dangerouslySetInnerHTML={{__html: post.content}} className="mt-4"></CardText>
                            </CardBody>
                        </Card>
                            )
                        }

                    </Col>
                </Row>
                <Row className="my-4">
                    <Col md={{
                        size: 9,
                        offset: 1
                    }}>
                        <h3>Comments ( {post ? post.comments.length : 0})</h3>
                        {
                            post?.comments && post.comments?.map((c, index) => (
                                <Card key={index} className="mt-4">
                                    <CardBody>
                                        <CardText>{c.content}</CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }
                        <Card className="mt-4">
                            <CardBody>
                                <Input 
                                    type="textarea" 
                                    placeholder="Add comment..." 
                                    onChange={(event) => setComment({content: event.target.value})}
                                    value={comment.content}>

                                </Input>
                                <Button color="primary" className="mt-2" onClick={submitPost}>Submit</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default PostPage