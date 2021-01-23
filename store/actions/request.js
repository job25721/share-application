import store from '../';
import {CLEAR_REQUEST_DATA} from '../types/request';

export const sendRequestAction = (createRequestMutation, navigate) => async (
  dispatch,
) => {
  const {reason, wantedRate, requestItemId} = store.getState().request;
  if (reason !== '' && requestItemId !== '') {
    try {
      const {data} = await createRequestMutation({
        variables: {
          reason,
          wantedRate,
          itemId: requestItemId,
        },
      });
      console.log(data);
      if (data) {
      }
      dispatch({type: CLEAR_REQUEST_DATA});
      navigate('Chat');
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('missing value');
  }
};
