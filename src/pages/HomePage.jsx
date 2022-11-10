import React, { useState } from "react";
import SlotModal from "../components/SlotModal";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import video from "../video.svg";
import safty from "../safty.svg";
import house from "../house.svg";
import arrow from "../arrow.svg";
import Main from "../Main.png";
import "./Homepage.css";

const HomePage = () => {
  const [btnClicked, setBtnClicked] = useState(false);
  const clickHandler = () => {
    setBtnClicked(!btnClicked);
  };
  console.log(btnClicked, "btnClicked");
  return (
    <div className="homePage">
      (
      <section className="Introduction">
        <Container fluid className="contfluid">
          <Row>
            <Col xl={6}>
              <div className="Introtext">
                <h2>
                  Your <span>Pet</span> is part of our family
                </h2>
                <p>
                  Want to train your pet? Or Looking for someone who takes care
                  of your pet? Well we are here.
                </p>
                <Row>
                  <Col xl={6} xs={6} className="bookbutton">
                    <Button
                      style={{
                        border: "2px solid #E39BA6",
                        background: " #E39BA6",
                        color: "#fff",
                        borderRadius: "20rem",
                      }}
                      onClick={clickHandler}
                    >
                      Book A Schedule
                    </Button>
                  </Col>
                  <Col xl={6} xs={6} className="pricebutton">
                    <Button
                      style={{
                        width: "9rem",
                        border: "2px dotted #E39BA6",
                        background: " #fff",
                        color: "black",
                        borderRadius: "20rem",
                      }}
                    >
                      Price Pack
                    </Button>
                  </Col>
                  <section className="Doitsection">
                    <Image src={arrow} />

                    <button id="doitnow"> Do it Now...!!</button>
                    <div class="lds-spinner">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </section>
                </Row>
              </div>
            </Col>

            <Col xl={6}>
              <div className="card">
                <Row className="align-items-center">
                  <Col xl={6} className="cardcol">
                    <img src={video} />
                  </Col>
                  <Col xl={6} className="cardcol1">
                    <h3>Moniter your pet</h3>
                    <p>We have a watch 24*7</p>
                  </Col>
                </Row>
              </div>
              <div className="card1">
                <Row className="align-items-center">
                  <Col xl={6} className="cardcol">
                    <img src={safty} />
                  </Col>
                  <Col xl={6} className="cardcol1">
                    <h3>Safety First </h3>
                    <p>We care them like babies</p>
                  </Col>
                </Row>
              </div>
              <img src={Main} style={{ width: "100%", height: "auto" }} />
              <div className="card2">
                <Row className="align-items-center">
                  <Col xl={6} className="cardcol">
                    <img src={house} />
                  </Col>
                  <Col xl={6} className="cardcol1">
                    <h3>Spacious play yards</h3>
                    <p>We play on a field</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      )
      <SlotModal btnClicked={btnClicked} clickHandler={clickHandler} />
    </div>
  );
};

export default HomePage;
