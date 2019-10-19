import React, { Component } from 'react';

import { Container } from 'react-bootstrap';

import ThemeFunctions from 'shared/Helpers/ThemeFunctions';
import { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import * as Helpers from 'shared/Helpers';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import PageHeader from 'shared/Components/PageHeader/PageHeader';
import ContactForm from 'pages/Contact/ContactForm/ContactForm';
import './Contact.scss';

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

          <Container>
            <PageHeader title="Contact" icon="envelope" />

            <ContactForm
              data={form.data}
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

export default Contact;
