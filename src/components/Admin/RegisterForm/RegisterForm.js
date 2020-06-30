import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  }); //input contiene el valor y setInputs cambia el valor

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });
  //Por la forma en la que está estructurado el programa, interesa que las variables de inputs y formValid se llamen igual, pero ojo, hay que tener cuidado porque al llamarse igual, siendo mal utilizadas, puede llevar a errores.

  //e.target son todas la variables que contiene el input: prefix, type, name, placeholder, onChange, value

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }

    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6),
      });
    }

    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };

  //Para que se resuelva una promesa hay que poner la función es asíncrona para que podamos utilizar el await. El programa va a esperar a que acabe para poder continuar su ejecución de código con el await.
  const register = async () => {
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;

    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales",
        });
      } else {
        const result = await signUpApi(inputs);
        if (!result.ok) {
          notification["error"]({
            message: result.message,
          });
        } else {
          notification["success"]({
            message: result.message,
          });
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");

      setInputs({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false,
      });

      setFormValid({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false,
      });
    }
  };

  return (
    // cuando el formulario tenga algún cambio ejecuta la función ChangeForm
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          className="register-form__input"
          prefix={<MailOutlined style={{ color: "rgba(0,0,0,0.25" }} />}
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          className="register-form__input"
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          className="register-form__input"
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          type="checkbox"
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leído y acepto la política de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button className="register-form__button" htmlType="submit">
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
