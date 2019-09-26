import React from 'react';
import { connect } from 'react-redux';

import './Account.scss';
import * as actionCreators from '../../core/Redux/Actions/ActionCreators';
import Utils from '../../shared/General/Utils';
import Dashboard from '../../layout/Dashboard';
import PageHeader from '../../shared/Components/PageHeader/PageHeader';
import Form from './Form/Form';

class Account extends React.Component {
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
      // Set field error messages
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
      // Set error messages
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
      // Handle edit account
      this.props.handleEditAccount(values);

      // Set success message
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
    Utils.clearFormMessage(this, 'form', object, property, index);
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { form } = this.state;

    return (
      <Dashboard>
        <main data-component="Account">
          <div className="container">
            <PageHeader title="Account" icon="user" />

            <Form
              fieldsErrors={form.fieldsErrors}
              feedbackMessages={form.feedbackMessages}
              onClearFormMessage={(object, property, index) => this.handleClearFormMessage(object, property, index)}
              onSubmit={(values) => this.handleSubmitForm(values)}
            />
          </div>
        </main>
      </Dashboard>
    );
  }
}


//==============================
// REDUX
//==============================

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleEditAccount: (userData) => dispatch(actionCreators.editAccount(userData)),
  };
};

export default connect(null, mapDispatchToProps)(Account);
