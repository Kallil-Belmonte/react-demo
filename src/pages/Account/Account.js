import React from 'react';
import { connect } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './Account.scss';
import * as actionCreators from '../../core/Redux/Actions/ActionCreators';
import Utils from '../../shared/General/Utils';
import Layout from '../../layout/Layout';
import PageHeader from '../../shared/Components/PageHeader/PageHeader';
import AccountForm from './AccountForm/AccountForm';

library.add(faUser);

class Account extends React.Component {

  state = {
    accountForm: {
      messages: {
        success: [],
        error: []
      },
      fieldsErrors: {
        email: []
      }
    }
  }

  render() {
    return (
      <Layout>
        <main data-component="Account">
          <div className="container">
            <PageHeader title="Account" icon={faUser} />

            <AccountForm
              onSubmit={(values) => this.handleSubmitAccountForm(values)}
              fieldsErrors={this.state.accountForm.fieldsErrors}
              feedbackMessages={this.state.accountForm.messages}
              clearFormMessage={(field, index) => this.handleClearFormMessage(field, index)}
            />
          </div>
        </main>
      </Layout>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // HANDLE SUBMIT ACCOUNT FORM
  handleSubmitAccountForm(values) {
    if (values.email === 'john.doe@email.com') {
      // Set field error messages
      this.setState((prevState, props) => {
        return {
          accountForm: {
            ...prevState.accountForm,
            fieldsErrors: {
              email: ['This e-mail already exists.']
            }
          }
        }
      });
    }
    else if (values.email === 'demo@demo.com') {
      // Set error messages
      this.setState((prevState, props) => {
        return {
          accountForm: {
            ...prevState.accountForm,
            messages: {
              ...prevState.accountForm.messages,
              error: ['An error occurred, please try again later.']
            }
          }
        }
      });
    }
    else {
      // Handle edit account
      this.props.handleEditAccount(values);

      // Set success message
      this.setState((prevState, props) => {
        return {
          accountForm: {
            ...prevState.accountForm,
            messages: {
              ...prevState.accountForm.messages,
              success: ['Account saved successfully.']
            }
          }
        }
      });
    }
  }


  // HANDLE CLEAR FORM MESSAGE
  handleClearFormMessage(field, index) {
    Utils.clearFormMessage(this, field, index, this.state.accountForm.messages, this.state.accountForm.fieldsErrors);
  }

}


//==============================
// REDUX
//==============================

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleEditAccount: (userData) => dispatch(actionCreators.editAccount(userData))
  };
};

export default connect(null, mapDispatchToProps)(Account);
