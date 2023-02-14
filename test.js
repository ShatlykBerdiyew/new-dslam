import { Router } from "next/router";
import { setLoading } from "../actions/loading";
import { loginUser } from "../actions/user";
import { BASE_URL } from "../urls";

export const asyncLoginUser = (user) => {
  return function (dispatch) {
    dispatch(setLoading(true));
    fetch(`${BASE_URL}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log(res);
        }
      })
      .then((json) => {
        dispatch(loginUser(json.access));
        Router.push("/profile");
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  };
};






export const asyncUserProfile = (token) => {
    return function (dispatch) {
      fetch(`${BASE_URL}/api/auth/profile-create/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => dispatch(getUserProfile(json.data)))
        .catch((err) => console.log(err));
    };
  };
  