import { isNil, is, has, path } from 'ramda'

/**
  Creates a reducer.
  @param {string} initialState - The initial state for this reducer.
  @param {object} handlers - Keys are action types (strings), values are reducers (functions).
  @return {object} A reducer object.
 */
export default (initialState, handlers) => {
  // initial state is required
  if (isNil(initialState)) {
    throw new Error('initial state is required')
  }

  // handlers must be an object
  if (isNil(handlers) || !is(Object, handlers)) {
    throw new Error('handlers must be an object')
  }

  // create the reducer function
  return (state = initialState, action) => {
    // wrong actions, just return state
    if (isNil(action)) return state
    if (!has('type', action)) return state

    // look for the handler
    const handler = handlers[action.type]

    // no handler no cry
    if (isNil(handler)) return state

    // execute the handler
    return handler(state, path(['payload'], action), action.type)
  }
}
