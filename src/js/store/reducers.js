import C from '../core/Constants'
import U from '../core/Util'
import { combineReducers } from 'redux'
import initialState from './initialState'

function topStoriesReducer (state = initialState.topstories, action) {
  switch (action.type) {
    case C.types.LOAD_TOP_STORIES_SUCCESS:
      return { ...state, ...action.topstories }
    case C.types.LOAD_MORE_ITEMS_SUCCESS:
      if (action.data.type === C.loadmoretype.STORY) {
        let newState = { ...state }
        newState.topstories = [...newState.topstories, ...action.data.topstories]
        newState.showMore = action.data.showMore
        newState.topStoryIds = action.data.topStoryIds
        return newState
      }
      return { ...state }
    default:
      return state
  }
}

function topCommentsReducer (state = initialState.topcomments, action) {
  switch (action.type) {
    case C.types.LOAD_STORY_COMMENTS_SUCCESS:
      if (!U.isObjValueInArray(state, 'index', action.index)) {
        let newState = [...state, action.comments]
        newState = newState.map((newItem) => {
          newItem.index === action.comments.index ? newItem.current = true : newItem.current = false
          return newItem
        })
        return newState
      }
      return state
    case C.types.LOAD_MORE_ITEMS_SUCCESS:
      if (action.data.type === C.loadmoretype.COMMENTS) {
        let newCState = [...state]
        let currComment = U.getObjValueInArray(newCState, 'index', action.data.index)[0]
        currComment.topcomments = [...newCState[0].topcomments, ...action.data.topcomments]
        newCState[0].showMore = action.data.showMore
        newCState[0].commentsIds = action.data.commentsIds
      }
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  topStoriesReducer,
  topCommentsReducer
})
export default rootReducer
