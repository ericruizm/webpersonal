import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

import "./LoginForm.scss";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  }); //input contiene el valor y setInputs cambia el valor

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    const result = await signInApi(inputs); //El await se para en esta función y cuando acabe continúa.

    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken); //Se guarda en el localStorage (del pc)
      localStorage.setItem(REFRESH_TOKEN, refreshToken); //Se guarda en el localStorage (del pc)

      notification["success"]({
        message: "Login correcto",
      });

      window.location.href = "/admin";
    }

    console.log(result);
  };
  return (
    <Form className="login-form" onFinish={login} onChange={changeForm}>
      <Form.Item>
        <Input
          className="login-form__input"
          prefix={<MailOutlined style={{ color: "rgba(0,0,0,0.25" }} />}
          type="email"
          name="email"
          placeholder="Correo electrónico"
        />
      </Form.Item>
      <Form.Item>
        <Input
          className="login-form__input"
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Button className="login-form__button" htmlType="submit">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
