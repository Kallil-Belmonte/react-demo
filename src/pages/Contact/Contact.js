import React from 'react';

import './Contact.scss';
import ThemeFunctions from '../../shared/General/ThemeFunctions';
import { MOCKY_INSTANCE, ENDPOINTS } from '../../core/API/API';
import Utils from '../../shared/General/Utils';
import Layout from '../../layout/Layout';
import Loader from '../../shared/Components/Loader/Loader';
import PageHeader from '../../shared/Components/PageHeader/PageHeader';
import Form from './Form/Form';

class Contact extends React.Component {

  state = {
    loading: true,
    form: {
      feedbackMessages: {
        success: [],
        error: []
      },
      data: {
        favoriteColors: []
      }
    }
  }

  componentDidMount() {
    this.getFormData();
    ThemeFunctions.jQueryMaskPlugin();
  }

  render() {
    return (
      <Layout>
        <main data-component="Contact">
          <Loader loading={this.state.loading} />

          <div className="container">
            <PageHeader title="Contact" icon="envelope" />

            <Form
              data={this.state.form.data}
              onSubmit={(values) => this.handleSubmitForm(values)}
              feedbackMessages={this.state.form.feedbackMessages}
              clearFormMessage={(object, property, index) => this.handleClearFormMessage(object, property, index)} />
          </div>
        </main>
      </Layout>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // GET FORM DATA
  getFormData() {
    MOCKY_INSTANCE.get(ENDPOINTS.contactForm.favoriteColors)
      .then(response => {
        this.setState((prevState, props) => {
          return {
            ...prevState,
            form: {
              ...prevState.form,
              data: {
                ...prevState.form.data,
                favoriteColors: response.data
              }
            }
          };
        });
      })
      .catch(error => {
        console.error(error);
      })
      .then(() => {
        // Deactivate loader
        this.setState((prevState, props) => {
          return {
            ...prevState,
            loading: false
          };
        });
      });
  }


  // HANDLE SUBMIT FORM
  handleSubmitForm(values) {
    console.log('Form submitted:', values);

    this.setState((prevState, props) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          feedbackMessages: {
            ...prevState.form.feedbackMessages,
            success: ['Message sent successfully.']
          }
        }
      };
    });
  }


  // HANDLE CLEAR FORM MESSAGE
  handleClearFormMessage(object, property, index) {
    Utils.clearFormMessage(this, 'form', object, property, index);
  }

}

export default Contact;
