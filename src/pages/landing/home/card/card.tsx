import classes from "./card.module.scss";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Logo from "../../../../assets/images/logo/digital-academy-logos.jpeg";
import Button from "react-bootstrap/Button";
const HomeCard = () => {
  let navigate = useNavigate();
  const login = () => {
    navigate("/auth/login");
  };
  const register = () => {
    navigate("/auth/register");
  };
  return (
    <div className={classes["card-contianer"] + " animate__slideInLeft"}>
      <div className={classes["card-details"]}>
        <div className={classes["card-box"]}>
          <Card style={{ width: "30rem" }}>
            <Card.Img variant="top" src={Logo} />
            <Card.Body>
              <Card.Title className={classes["text-center"]}>
                Community Portal
              </Card.Title>
              <Card.Text className={classes["text-center"]}>
                Join us today to meet people who are interested in what you like
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Button
                  variant="warning"
                  size="lg"
                  className={classes["max-width"]}
                  onClick={register}
                >
                  Register
                </Button>
                <Button
                  variant="light"
                  size="lg"
                  className={classes["max-width"] + " " + classes["m-t2"]}
                  onClick={login}
                >
                  Login
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
