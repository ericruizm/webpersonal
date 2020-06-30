import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { suscribeNewsletterApi } from "../../../api/newsletter";
import "./Newsletter.scss";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const onFinish = () => {
    // eslint-disable-next-line no-useless-escape
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //es una expresión estandarizada para validarEmail
    const resultValidation = emailValid.test(email); //Si email es valido devuelve true

    if (!resultValidation) {
      notification["error"]({
        message: "El correo electrónico no es válido.",
      });
    } else {
      suscribeNewsletterApi(email).then((response) => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          notification["success"]({
            message: response.message,
          });
          setEmail("");
        }
      });
    }
  };
  return (
    <div className="newsletter">
      <h3>Newsletter</h3>
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25" }} />}
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            ¡Me suscribo!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
