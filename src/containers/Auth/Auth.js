import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import { Redirect } from 'react-router-dom';


class Auth extends Component {

    state = {
        signinControls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        signupControls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            rpassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Re-enter password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false,
        errorMessage: null
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) => {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== ''&&isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength&&isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.minLength&&isValid;
        }

        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        
        if(this.state.isSignup){
            const updatedControls = {
                ...this.state.signupControls,
                [controlName]:{
                    ...this.state.signupControls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.signupControls[controlName].validation),
                    touched: true
                }
            };
            this.setState({signupControls: updatedControls});
        }
        if(!this.state.isSignup){
            const updatedCon = {
                ...this.state.signinControls,
                [controlName]:{
                    ...this.state.signinControls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.signinControls[controlName].validation),
                    touched: true
                }
            };
            this.setState({signinControls: updatedCon});
        }
        
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.isSignup){
            if(this.state.signupControls.password.value!==this.state.signupControls.rpassword.value){
                this.setState({errorMessage:(<p>Passwords are not matching. Please check.</p>)});
            }else{
                this.setState({errorMessage: null});
            this.props.onAuth(this.state.signupControls.email.value, this.state.signupControls.password.value, this.state.isSignup);}
        }
        if(!this.state.isSignup){
            this.props.onAuth(this.state.signinControls.email.value, this.state.signinControls.password.value, this.state.isSignup);
        }
        
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {

        const formElementsArray = [];
        if(this.state.isSignup){
            for (let key in this.state.signupControls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.signupControls[key]
                });
            }
        }else{
            for (let key in this.state.signinControls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.signinControls[key]
                });
            }
        }
        

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                invalid={!formElement.config.valid}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                shouldValidate={formElement.config.validation.required}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            
        ));

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
            console.log(this.props.error.message);
            switch(this.props.error.message){
                case 'EMAIL_NOT_FOUND':
                    console.log(1);
                    errorMessage = (<p>There is no user record corresponding to this email.</p>);
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = (<p>Invalid Password.</p>);
                    break;
                case 'EMAIL_EXISTS':
                    errorMessage = (<p>The email address is already in use by another account.</p>);
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = (<p>The password is invalid.</p>);
                    break;
                default:
                    errorMessage = null;
            }
            //     (
            //     <p>{this.props.error.message}</p>
            // );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {this.state.errorMessage}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>{this.state.isSignup?'SWITCH TO SIGNIN':'SWITCH TO SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);