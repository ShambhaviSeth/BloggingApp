import { Card, CardBody, CardHeader, Col, Container, Form, Row , Label, Input, FormGroup, Button} from "reactstrap";
import Base from "../Components/Base"
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../Auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Login = () => {

    const userContextData = useContext(UserContext)
    const navigate = useNavigate()

    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event,field) => {
        let actualValue = event.target.value;
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (loginDetail.username.trim() == '' || loginDetail.password.trim() == '') {
            toast.error("Username or Password is missing");
            return
        }
        loginUser(loginDetail).then((data) => {
            console.log(data)
            doLogin(data, () => {
                console.log("Login detail  is stored to local storage")
                userContextData.setUser({
                    data: data.user,
                    login: true

                })
                navigate("/user/dashboard")
            })
            toast.success("User logged in successfully")
        }).catch(error => {
            if(error.response.status == 400 || error.response.status == 404){
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Something went wrong")
            }
        })
    }

    const handleReset = () => {
        setLoginDetail({
            username: '',
            password: ''
        })
    }

    return (
        <Base>
        <Container>
            <Row className="mt-4">
                <Col sm={{size:6, offset:3}}>
                    <Card>
                        <CardHeader>Login Here</CardHeader>
                        <CardBody>
                            <Form onSubmit={handleFormSubmit}>
                                {/* Email field */}
                                <FormGroup>
                                    <Label for="email">Enter Email</Label>
                                    <Input type="text" placeholder="Enter your email here" id="email" value={loginDetail.username} onChange={(e)=>handleChange(e, 'username')}></Input>
                                </FormGroup>
                                {/* Password field */}
                                <FormGroup>
                                    <Label for="password">Enter Email</Label>
                                    <Input type="password" placeholder="Enter your password here" id="password" value={loginDetail.password} onChange={(e)=>handleChange(e, 'password')}></Input>
                                </FormGroup>
                                <Container className="text-center">
                                    <Button color="dark">Login</Button>
                                    <Button color="secondary" type="reset" className="ms-2" onClick={handleReset}>Reset</Button>
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

export default Login;