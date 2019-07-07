import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../../server/routes';

export const addMessage = createAction('MESSAGE_ADD');
export const changeChannel = createAction('CHANNEL_CHANGE');

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

// export const addMessage = message => async (dispatch) => {
//   const response = await axios.post(routes.tasksUrl(), message);
//   dispatch(addMessageSuccess({ message: response.data }));
// };

// export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
// export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
// export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');
//
// export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
// export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
// export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');
//
// export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
// export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
// export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');
