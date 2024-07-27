import { useEffect, useState } from "react";
import { loadAllPosts, deletePostService } from "../services/post-service";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

function NewFeed() {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages:'',
        totalElements:'',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    })

    const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {
        changePage(currentPage)

    },[currentPage])

    const changePage = (pageNumber=0, pageSize=5) => {
        if(pageNumber > postContent.pageNumber && postContent.lastPage){
            return
        }
        if(pageNumber < postContent.pageNumber && postContent.pageNumber == 0){
            return
        }
        loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content:[...postContent.content, ...data.content],
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })
            window.scroll(0,0)
        }).catch(error => {
            toast.error("Error while loading posts")
        })
    }

    function deletePost(post) {
        deletePostService(post.postId).then(res => {
            toast.success("Post deleted successfully!")
            let newPostContents = postContent.content.filter(p => p.postId != post.postId)
            setPostContent({...postContent,content:newPostContents})

        }).catch(error => {
            toast.error("Error in deleting post")
        })
    }


    const changePageInfinite = () => {
        setCurrentPage(currentPage + 1)
    }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={ {
                    size:12
                }
                }>
                    <h1>Blogs Count {postContent?.totalElements}</h1>
                    <InfiniteScroll
                    dataLength={postContent.content.length}
                    next={changePageInfinite}
                    hasMore={!postContent.lastPage}
                    endMessage={
                        <p style={{textAlign:'center'}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }>
                    {
                        postContent.content.map((post) => {
                            console.log(post);
                            return <Post deletePost={deletePost} key={post.postId} post={post} />;
                    })}
                    </InfiniteScroll>
                    {/* Container className="mt-3">
                    <Pagination size="md">
                        <PaginationItem disabled={postContent.pageNumber == 0} onClick={() => changePage(postContent.pageNumber - 1)}>
                            <PaginationLink previous>Previous</PaginationLink>
                        </PaginationItem>
                        {
                            [...Array(postContent.totalPages)].map((item, index) => (
                                <PaginationItem key={index} active={index == postContent.pageNumber} onClick={() => changePage(index)}>
                                    <PaginationLink>
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        }
                        <PaginationItem disabled={postContent.lastPage} onClick={() => {changePage(1 + postContent.pageNumber)}}>
                            <PaginationLink next>Next</PaginationLink>
                        </PaginationItem>
                    </Pagination>
                    </Container */}
                </Col>
            </Row>
        </div>
    )
}

export default NewFeed