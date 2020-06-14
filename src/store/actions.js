import * as actionTypes from './actionTypes';

export const sendData = (name, id) => {
  return (dispatch) => {
          dispatch({
              type: actionTypes.SEND_DATA,
              orgname: name,
              orgId: id
          })
  };
};