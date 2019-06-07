import C from '../core/Constants'

export default function (state = {}, action) {
  switch (action.type) {
    case C.types.LOAD_TOP_STORIES_SUCCESS:
      return action.topstories
    case C.types.ADD_TOP_STORY_SUCCESS:
      let topstories = state.topstories
      topstories.push(action.topstory)
      return state.topstories
    case C.types.LOAD_STORY_COMMENTS_SUCCESS:
      console.log(state)
      return action.comments
    default:
      return state
  }
}
