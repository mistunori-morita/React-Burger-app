import React,{Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return  nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentWillUpdate(){
    console.log('Update');
  }
  render(){
    return(
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
        className={classes.Modal}
        style={{
          tranform: this.props.show ? 'tranlateY(0)' : 'tranlateY(-100vh)',
          opacity: this.props.show ? '1' : '0'
        }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
