import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {

  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    console.log(this.props);
    // axios.get('https://react-buger-be17f.firebaseio.com/orders/-L2s6T21WLJUn-YfKi1B/ingredients.json').then(response => {
    //   this.setState({ingredients: response.data});
    // }).catch(error => {
    //   this.setState({error: true})
    // });
  }




  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      this.setState({purchasable: sum > 0});
  }


  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseChancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '='+ encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+ this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cants be a loaded!</p> : <Spinner />;

    if(this.props.ings){
      burger = (
          <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
              price={this.props.price}/>
          </Aux>
        );
        orderSummary = <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseChancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          />
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseChancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings: state.ingredients,
    price: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
