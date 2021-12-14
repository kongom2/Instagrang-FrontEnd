import { createAction, handleAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { deleteCookie, getCookie, setCookie } from "../../shared/cookie";
import axios from "axios";
// import { apis } from "../../api/axios";

// 액션
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// 액션 크리에이터
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// 초기값
const initialStat = {
  user: null,
  is_login: false,
};

const loginDB = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    // 로그인 api
    const user = {
      username: email,
      password: pwd,
    };
    console.log(user);
    // apis
    //   .login(user)
    axios
      .post("http://3.36.100.253/user/login", user)
      .then((res) => {
        console.log("loginDB 접근 확인");
        const jwtToken = res.headers.authorization;
        localStorage.setItem("token", jwtToken);
        dispatch(setUser({ email: email, user_name: email }));
        alert("정상적으로 로그인 되었습니다.");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.errorMessage);
        return;
      });
  };
};

const signupDB = (email, userName, pwd) => {
  return function (dispatch, getState, { history }) {
    //api
    const user = {
      email: email,
      nickname: userName,
      password: pwd,
    };
    // apis
    //   .signUp(user)
    axios
      .post("http://3.36.100.253/user/signup", user)
      .then(() => {
        window.alert("회원가입을 축하드립니다!");
        history.push("/");
      })
      .catch((err) => {
        const aa = { ...err };
        window.alert(err.response.data.errorMessage);
      });
  };
};

// const loginCheckDB = () => {
//   return function (dispatch, getState, { history }) {
//     const localToken = localStorage.getItem("token");
//     const token = { token: localToken };
//     console.log(localToken);
//     apis
//       .loginCheck(token)
//       .then((res) => {
//         console.log(res);
//         dispatch(setUser([res]));
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("로그인 정보가 없습니다.");
//         history.push("/");
//       });
//   };
// };

// 토큰삭제
const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("token");
    history.push("/login");
    window.location.reload();
  };
};

//리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "SUCCESS");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        localStorage.removeItem("token");
        window.sessionStorage.clear();
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialStat
);

const actionCreators = {
  logOut,
  getUser,
  signupDB,
  loginDB,
  // loginCheckDB,
  logoutDB,
};

export { actionCreators };