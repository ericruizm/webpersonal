import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import reactJsHooks from "../../../assets/img/jpg/react-js-hooks.jpg";
import javaScript from "../../../assets/img/jpg/javascript-es6.jpg";
import prestaShop from "../../../assets/img/jpg/prestashop-1-7.jpg";
import reactNative from "../../../assets/img/jpg/react-native.jpg";
import wordPress from "../../../assets/img/jpg/wordpress.jpg";
import cssGrid from "../../../assets/img/jpg/css-grid.jpg";

import "./HomeCourses.scss";

export default function HomeCourses() {
  return (
    <Row className="home-courses">
      <Col lg={24} className="home-courses__title">
        <h2>Aprende y mejora tus habilidades</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-courses">
          <Col md={6}>
            <CardCourse
              image={reactJsHooks}
              title="React Js Hooks"
              subtitle="Intermedio - React/JavaScript"
              link="https://www.youtube.com/?gl=ES&hl=es"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={reactNative}
              title="React Native Expo"
              subtitle="Intermedio - React/JavaScript"
              link="https://www.youtube.com/?gl=ES&hl=es"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={javaScript}
              title="JavaScript ES6"
              subtitle="Intermedio - React/JavaScript"
              link="https://www.youtube.com/?gl=ES&hl=es"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={wordPress}
              title="Wordpress"
              subtitle="Intermedio - Wordpress 20.1.16 "
              link="https://www.youtube.com/?gl=ES&hl=es"
            />
          </Col>
        </Row>
        <Row className="row-courses">
          <Col md={6}>
            <CardCourse
              image={prestaShop}
              title="PrestaShop 1.7"
              subtitle="Básico - PrestaShop"
              link="https://www.youtube.com/?gl=ES&hl=es"
            />
          </Col>

          <Col md={6} />
          <Col md={6} />
          <Col md={6}>
            <CardCourse
              image={cssGrid}
              title="CSS Grids"
              subtitle="Intermedio - CSS/SCSS"
              link="https://www.youtube.com/?gl=ES&hl=es"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-courses__more">
        <Link to="/courses">
          <Button>Ver más</Button>
        </Link>
      </Col>
    </Row>
  );
}

function CardCourse(props) {
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  return (
    //El target "_blank" es para que el link se te abra en una pestaña nueva, va seguido de rel="noopener noreferrer"
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} />}
        actions={[<Button>Entrar</Button>]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </a>
  );
}
