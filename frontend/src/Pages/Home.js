import { Col, Container, Row } from "reactstrap";
import Base from "../Components/Base";
import NewFeed from "../Components/NewFeed";
import CategorySideMenu from "../Components/CategorySideMenu";

const Home = () => {

    return (
        <Base>
        <div>
            <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-3">
                    <CategorySideMenu></CategorySideMenu>
                </Col>
                <Col md={10}>
                    <NewFeed></NewFeed>
                </Col>
            </Row>
            </Container>
        </div>
        </Base>
    );
};

export default Home;