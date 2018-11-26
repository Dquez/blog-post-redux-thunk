import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';

class UserHeader extends Component {

    componentDidMount(){
        this.props.fetchUser(this.props.userId);
    }
    render(){

        return(
            <div>User: {this.props.user.name || ""}</div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {user: state.user}
}

export default connect(mapStateToProps, {fetchUser})(UserHeader);