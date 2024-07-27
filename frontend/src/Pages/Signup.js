import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../Components/Base";
import { useEffect, useState } from "react";
import { signup } from "../services/user-service";
import {toast} from 'react-toastify';

const Signup = () => {

    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        about: ""
    })

    const [error, setError] = useState({
        error:{},
        isError: false
    })

    useEffect(() => {
        
    }, [data])

    const handleChange = (event, property) => {
        setData({...data, [property]:event.target.value})
    }

    const resetData = () => {
        setData({
            name:"",
            email:"",
            password:"",
            about: ""
        })
    }

    const submitForm = (event) => {
        event.preventDefault();
        
        signup(data).then((resp) => {
            console.log("SUCCESS");
            toast.success("User is registered succesfully");
            setData({
                name:"",
                email:"",
                password:"",
                about: ""
            });
        }).catch((error) => {
            console.log("error");
            console.log(error);
            setError({
                error:error,
                isError: true
            })
        });
    }

    return (
        <Base>
        <Container>
            <Row className="mt-4">
                <Col sm={{size:6, offset:3}}>
                <Card>
                <CardHeader>
                    Fill the below details to Register!
                </CardHeader>
                <CardBody>
                    <Form onSubmit={submitForm}>
                        {/* Name field */}
                        <FormGroup>
                            <Label for="name">Enter Name</Label>
                            <Input type="text" placeholder="Enter your name here" id="name" onChange={(e)=>handleChange(e, "name")} value={data.name} invalid={ error.error?.response?.data.name ? true : false}></Input>
                        </FormGroup>
                        <FormFeedback>
                            {error.error?.response?.data.name}
                        </FormFeedback>
                         {/* Email field */}
                         <FormGroup>
                            <Label for="email">Enter Email</Label>
                            <Input type="text" placeholder="Enter your email here" id="email" onChange={(e)=>handleChange(e, "email")} value={data.email} invalid={ error.error?.response?.data.email ? true : false}></Input>
                        </FormGroup>
                        <FormFeedback>
                            {error.error?.response?.data.email}
                        </FormFeedback>
                        {/* Password field */}
                        <FormGroup>
                            <Label for="password">Enter Password</Label>
                            <Input type="password" placeholder="Enter your password here" id="password" onChange={(e)=>handleChange(e, "password")} value={data.password} invalid={ error.error?.response?.data.password ? true : false}></Input>
                        </FormGroup>
                        <FormFeedback>
                            {error.error?.response?.data.password}
                        </FormFeedback>
                        {/* about field */}
                        <FormGroup>
                            <Label for="about">Enter ABout</Label>
                            <Input type="textarea" placeholder="Enter your about info here" id="about" style={{height:"250px"}} onChange={(e)=>handleChange(e, "about")} value={data.about}></Input>
                        </FormGroup>
                        <Container className="text-center">
                            <Button color="dark">Register</Button>
                            <Button color="secondary" type="reset" className="ms-2" onClick={resetData}>Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
                </Col>
            </Row>
        </Container>
        </Base>
    );
};

export default Signup;