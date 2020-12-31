import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props){
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        state ={
            error:null
        }

        // componentDidMount(){
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         return req;
        //     });
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({error: error});
        //     });
        // }

        componentWillUnmount(){
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        }

        render() {
            return (<Auxi>
                <WrappedComponent {...this.props} />
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error?this.state.error.message:null}
                </Modal>
            </Auxi>
            );
        }
    }
        
}


export default withErrorHandler;