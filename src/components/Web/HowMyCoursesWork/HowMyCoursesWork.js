import React from "react";
import { Row, Col, Card } from "antd";
import {
  ClockCircleOutlined,
  KeyOutlined,
  MessageOutlined,
  UserOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
  return (
    <Row className="how-my-courses-work">
      <Col lg={24} className="how-my-courses-work__title">
        <h2>¿Cómo funcionan mis cursos?</h2>
        <h3>
          Cada curso cuenta con contenido bajo la web de Udemy, activa las 24
          horas del día los 365 días del año.
        </h3>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title="Cursos y Clases"
              subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<KeyOutlined />}
              title="Acceso 24/7"
              subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<MessageOutlined />}
              title="Aprendizaje colaborativo"
              subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
            />
          </Col>
        </Row>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon={<UserOutlined />}
              title="Mejora tu perfil"
              subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<DollarCircleOutlined />}
              title="Precios bajos"
              subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<CheckCircleOutlined />}
              title="Certificados de finalización"
              subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function CardInfo(props) {
  const { icon, title, subtitle } = props;
  const { Meta } = Card;

  return (
    <Card className="how-my-courses-work__card">
      {icon}
      <Meta title={title} description={subtitle} />
    </Card>
  );
}
