import Base from "../Components/Base"
import UserContext from "../context/UserContext";

const About = () => {
    return (
        <UserContext.Consumer>
            {
                (object) => (
                    <Base>
                        <h1>This is a header</h1>
                        <p>We are building a blog website</p>
                        <h1>Welcome {object.user.login && object.user.data.user.name}</h1>
                    </Base>
                )
            }
        </UserContext.Consumer>
    );
};

export default About;