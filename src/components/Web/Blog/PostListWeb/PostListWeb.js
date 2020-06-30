import React, { useState, useEffect } from "react";
import { Spin, List, notification } from "antd";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
import { getPostsApi } from "../../../../api/post";
import "moment/locale/es"; //para que todo lo que se guarde en moment se guarde en español

import "./PostListWeb.scss";

export default function PostListWeb(props) {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPosts(response.posts);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  }, [page]);

  if (!posts) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog de programación | Eric Ruiz Molero</title>
      </Helmet>
      <div className="post-list-web">
        <h1>Blog</h1>
        <List
          dataSource={posts.docs}
          renderItem={(posts) => <Post posts={posts} />}
        />
        <Pagination posts={posts} location={location} history={history} />
      </div>
    </>
  );
}

function Post(props) {
  const { posts } = props;

  const day = moment(posts.date).format("DD");
  const month = moment(posts.month).format("MMMM");

  return (
    <List.Item className="post">
      <div className="post__date">
        <span>{day}</span>
        <span>{month}</span>
      </div>
      <Link to={`blog/${posts.url}`}>
        <List.Item.Meta title={posts.title} />
      </Link>
    </List.Item>
  );
}
