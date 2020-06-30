import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  KeyOutlined,
  GiftOutlined,
  DollarOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { addCourseApi, updateCourseApi } from "../../../../api/courses";

import "./AddEditCourseForm.scss";

export default function AddEditCourseForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    course ? setCourseData(course) : setCourseData({}); //Si course existe... "seteamelo"
  }, [course]);

  const addCourse = () => {
    if (!courseData.idCourse) {
      notification["error"]({
        message: "El id del curso es obligatorio.",
      });
    } else {
      const accessToken = getAccessTokenApi();
      addCourseApi(accessToken, courseData)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData({});
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, inténtelo más tarde.",
          });
        });
    }
  };

  const updateCourse = () => {
    const accessToken = getAccessTokenApi();
    updateCourseApi(accessToken, course._id, courseData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadCourses(true);
        setCourseData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, inténtelo más tarde.",
        });
      });
  };

  return (
    <div className="add-edit-course-form">
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        courseData={courseData}
        setCourseData={setCourseData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { course, addCourse, updateCourse, setCourseData, courseData } = props;

  return (
    <Form
      className="form-add-edit"
      onFinish={course ? updateCourse : addCourse}
    >
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder="ID del curso"
          value={courseData.idCourse}
          onChange={(e) =>
            setCourseData({ ...courseData, idCourse: e.target.value })
          }
          disabled={course ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="URL del curso"
          value={courseData.link}
          onChange={(e) =>
            setCourseData({ ...courseData, link: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GiftOutlined />}
          placeholder="Cupón de descuento"
          value={courseData.coupon}
          onChange={(e) =>
            setCourseData({ ...courseData, coupon: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<DollarOutlined />}
          placeholder="Precio del curso"
          value={courseData.price}
          onChange={(e) =>
            setCourseData({ ...courseData, price: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {course ? "Actualizar curso" : "Crear curso"}
        </Button>
      </Form.Item>
    </Form>
  );
}
