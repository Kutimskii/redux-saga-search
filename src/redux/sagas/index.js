import {takeLatest, put, spawn, take, debounce,retry, call} from 'redux-saga/effects';
import {searchSkillsRequest, searchSkillsSuccess} from '../actions/actionCreators';
import { searchSkills } from '../../api';
import { SEARCH_SKILLS_REQUEST, CHANGE_SEARCH_FIELD } from '../actions/actionsType';

function filterChangeSearchAction({type, payload}) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== ''
}
function* watchSearchSkillsSaga() {
    yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}
function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search));
}

function* watchChangeSearchSaga() {
  yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
}
function* handleSearchSkillsSaga(action) {
  const data = yield call(searchSkills, action.payload.search);
  yield put(searchSkillsSuccess(data));
}
export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga)
  console.log('saga run')
}
