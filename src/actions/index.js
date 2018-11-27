import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';
export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({type: 'FETCH_POSTS', payload: response.data})
}

export const fetchUser = userId => dispatch => {
    _fetchUser(userId, dispatch);
}

// memoize function is used to save the return value of the API request so the function doesn't get called for every mounted UserHeader component
const _fetchUser = _.memoize(async (userId, dispatch)=>{
    const response = await jsonPlaceholder.get(`/users/${userId}`);
    dispatch({type: 'FETCH_USER', payload: response.data})
});