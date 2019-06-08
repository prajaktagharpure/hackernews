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
      return action.comments

    case C.types.LOAD_MORE_ITEMS_SUCCESS:
      if (action.type === C.loadmoretype.STORY) {
        return action.topstories
      } else if (action.type === C.loadmoretype.COMMENTS) {
        return action.comments
      }
      break
    default:
      return state
  }
}
