import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import concat from 'lodash/concat';
import omitBy from 'lodash/omitBy';
import * as actions from '../actions';

const socketConnectionState = handleActions({
  [actions.disconnectSocket]() {
    return 'disconnected';
  },
  [actions.connectSocket]() {
    return 'connected';
  },
}, 'idle');

const messagesFetchingState = handleActions({
  [actions.fetchMessagesRequest]() {
    return 'requested';
  },
  [actions.fetchMessagesFailure]() {
    return 'failed';
  },
  [actions.fetchMessagesSuccess]() {
    return 'finished';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.renameChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
}, 'none');


const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { newChannel } }) {
    const { allIds, byId } = state;
    const { id } = newChannel;
    return {
      allIds: [...allIds, id],
      byId: { ...byId, [id]: newChannel },
    };
  },
  [actions.renameChannelSuccess](state, { payload: { renamedChannel } }) {
    const { byId, allIds } = state;
    const { id } = renamedChannel;
    return {
      allIds,
      byId: { ...byId, [id]: renamedChannel },
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { allIds, byId } = state;
    return {
      allIds: allIds.filter(chId => chId !== id),
      byId: omitBy(byId, ch => ch.id === id),
    };
  },
}, {});

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload: { messagesList, currentChannelId } }) {
    return { ...state, [currentChannelId]: messagesList };
  },
  [actions.addMessageSuccess](state, { payload: { message } }) {
    const { channelId } = message;
    const newMessages = state[channelId] ? concat(state[channelId], message) : [message];
    return { ...state, [channelId]: newMessages };
  },
}, {});

const chatUIState = handleActions({
  [actions.changeChannel](state, { payload: { channelId } }) {
    return { ...state, currentChannelId: channelId };
  },
  [actions.showRenameModal](state, { payload: { channelId } }) {
    return { ...state, ModalChannelEditState: 'renameModal', channelToEdit: channelId };
  },
  [actions.showRemoveModal](state) {
    return { ...state, ModalChannelEditState: 'removeModal' };
  },
  [actions.closeModal](state) {
    return { ...state, ModalChannelEditState: 'hide', channelToEdit: null };
  },
  [actions.renameChannelSuccess](state) {
    return { ...state, channelToEdit: null };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { currentChannelId } = state;
    return {
      ...state,
      channelToEdit: null,
      currentChannelId: id === currentChannelId ? 1 : currentChannelId,
    };
  },
}, {});

export default combineReducers({
  socketConnectionState,
  messagesFetchingState,
  channelAddingState,
  channelRenamingState,
  channelRemovingState,
  channels,
  messages,
  chatUIState,
  form: formReducer,
});
