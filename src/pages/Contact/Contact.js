import React, { Component } from 'react';

import './Contact.scss';
import ThemeFunctions from 'shared/Helpers/ThemeFunctions';
import { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import * as Helpers from 'shared/Helpers';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import PageHeader from 'shared/Components/PageHeader/PageHeader';
import Form from 'pages/Contact/Form/Form';

class Contact extends Component {
  state = {
    loading: true,
    form: {
      feedbackMessages: {
        success: [],
        error: [],
      },
      data: {
        favoriteColors: [],
      },
    }
  }

  componentDidMount() {
    this.getFormData();
    ThemeFunctions.jQueryMaskPlugin();
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // GET FORM DATA
  getFormData() {
    MOCKY_INSTANCE.get(ENDPOINTS.contactForm.favoriteColors)
      .then(response => {
        this.setState((prevState, props) => ({
          form: {
            ...prevState.form,
            data: {
              ...prevState.form.data,
              favoriteColors: response.data,
            },
          },
        }));
      })
      .catch(error => {
        console.error(error);
      })
      .then(() => {
        // Deactivate loader
        this.setState({ loading: false });
      });
  }


  // HANDLE SUBMIT FORM
  handleSubmitForm(values) {
    console.log('Form submitted:', values);

    this.setState((prevState, props) => ({
      form: {
        ...prevState.form,
        feedbackMessages: {
          ...prevState.form.feedbackMessages,
          success: ['Message sent successfully.'],
        },
      },
    }));
  }


  // HANDLE CLEAR FORM MESSAGE
  handleClearFormMessage(object, property, index) {
    Helpers.clearFormMessage(this, 'form', object, property, index);
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { loading, form } = this.state;

    return (
      <Dashboard>
        <main data-component="Contact">
          <Loader loading={loading} />

          <div className="container">
            <PageHeader title="Contact" icon="envelope" />

            <Form
              data={form.data}
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

export default Contact;
