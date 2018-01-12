import React,{ Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrederSummary extends Component {

  //This colud be a functional compoment, dosen't have to be a class
  componentWillUpdate() {
    console.log('tetete');
  }


  render() {

    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igkey => {
        return (
          <li key={igkey}>
          <span style={{ textTranform: 'capitalize' }}>{igkey}</span>:
            {this.props.ingredients[igkey]}</li>
        );
      });

    return(
      <Aux>
        <h3>Your Order</h3>
        <p>A delicius burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrederSummary;
