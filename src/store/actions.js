import * as actionTypes from './actionTypes';

export const getPageData = (email, password) => {
    return (dispatch) => {
       if (( email === "himanshusinghal829@gmail.com") && (password === "POC@2020")) {
            dispatch({
                type: actionTypes.GET_PAGE_DATA,
                role: "super-admin"
            })
       }
    };
};

export const sendData = (name, id) => {
  return (dispatch) => {
          dispatch({
              type: actionTypes.SEND_DATA,
              orgname: name,
              orgId: id
          })
  };
};