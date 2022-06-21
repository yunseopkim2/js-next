import React, {useState} from 'react';
import {useDispatch, connect} from 'react-redux';
import {registerRequest} from '@/modules/auth/register';
import {Register} from '@/components/auth/Register';

const RegisterPage = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        name: '',
    })
    const dispatch = useDispatch()
    const getToday = () => {
      var date = new Date();
      var year = date.getFullYear();
      var month = ("0" + (1 + date.getMonth())).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
  
      return year + "-" + month + "-" + day;
  }
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setUser({
            ...user, regDate: getToday(),
            [name]: value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        dispatch(registerRequest(user))
    }
    return (<Register onChange={onChange} onSubmit={onSubmit}/>);
};
const mapStateToProps = state => ({isRegistered: state.register.isRegistered});
const registerActions = {registerRequest}
export default connect(mapStateToProps, registerActions)(RegisterPage);