import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'react-bootstrap';

import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import * as Helpers from 'shared/Helpers';
import Dashboard from 'layout/Dashboard';
import PageHeader from 'shared/Components/PageHeader/PageHeader';
import AccountForm from 'pages/Account/AccountForm/AccountForm';
import './Account.scss';

class Account extends Component {
  state = {
    form: {
      feedbackMessages: {
        success: [],
        error: [],
      },
      fieldsErrors: {
        email: [],
      },
    },
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // HANDLE SUBMIT FORM
  handleSubmitForm(values) {
    if (values.email === 'john.doe@email.com') {
      this.setState((prevState, props) => ({
        form: {
          ...prevState.form,
          fieldsErrors: {
            ...prevState.form.fieldsErrors,
            email: ['This e-mail already exists.'],
          },
        },
      }));
    }
    else if (values.email === 'demo@demo.com') {
      this.setState((prevState, props) => ({
        form: {
          ...prevState.form,
          feedbackMessages: {
            ...prevState.form.feedbackMessages,
            error: ['An error occurred, please try again later.'],
          },
        },
      }));
    }
    else {
      this.props.handleEditAccount(values);

      this.setState((prevState, props) => ({
        form: {
          ...prevState.form,
          feedbackMessages: {
            ...prevState.form.feedbackMessages,
            success: ['Account saved successfully.'],
          },
        },
      }));
    }
  }


  // HANDLE CLEAR FORM MESSAGE
  handleClearFormMessage(object, property, index) {
    Helpers.clearFormMessage(this, 'form', object, property, index);
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { form } = this.state;

    return (
      <Dashboard>
        <main data-component="Account">
          <Container>
            <PageHeader title="Account" icon="user" />

            <AccountForm
              fieldsErrors={form.fieldsErrors}
              feedbackMessages={form.feedbackMessages}
              onClearFormMessage={(object, property, index) => this.handleClearFormMessage(object, property, index)}
              onSubmit={(values) => this.handleSubmitForm(values)}
            />
          </Container>
        </main>
      </Dashboard>
    );
  }
}


//==============================
// REDUX
//==============================

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  handleEditAccount: (userData) => dispatch(actionCreators.editAccount(userData)),
});

export default connect(null, mapDispatchToProps)(Account);
