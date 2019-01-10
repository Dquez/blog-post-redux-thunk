import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts())
    const userIds = _.uniq(_.map(getState().posts, "userId"))
    // alternative to memoize, where we are creating one xhr request per unique id and dispatching the result to be added to our users array in the redux state
    userIds.forEach(id=> dispatch(fetchUser(id)))

    // using the chain function as an alternative to condense the code above
    // _.chain(getState().posts)
    //  .map("userId")
    //  .uniq()
    //  .forEach(id=> dispatch(fetchUser(id)))
    //  .value()
}

export const fetchPosts = () => async dispatch => {
    
    const response = await jsonPlaceholder.get('/posts');
    dispatch({type: 'FETCH_POSTS', payload: response.data})
}

export const fetchUser = userId => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${userId}`);
    dispatch({type: 'FETCH_USER', payload: response.data})
}

// memoize function is used to save the return value of the API request so the function doesn't get called for every mounted UserHeader component
// const _fetchUser = _.memoize(async (userId, dispatch)=>{
//     const response = await jsonPlaceholder.get(`/users/${userId}`);
//     dispatch({type: 'FETCH_USER', payload: response.data})
// });