import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './Contact.scss';
import ThemeFunctions from '../../shared/General/ThemeFunctions';
import { MOCKY_INSTANCE, ENDPOINTS } from '../../core/API/API';
import Layout from '../../layout/Layout';
import Loader from '../../shared/Components/Loader/Loader';
import PageHeader from '../../shared/Components/PageHeader/PageHeader';
import ContactForm from './ContactForm/ContactForm';

library.add(faEnvelope);

class Contact extends React.Component {

  state = {
    loading: true,
    contactForm: {
      messages: {
        success: null,
        error: []
      },
      data: {
        favoriteColors: []
      }
    }
  }

  componentDidMount() {
    this.getContactFormData();
    ThemeFunctions.jQueryMaskPlugin();
  }

  render() {
    return (
      <Layout>
        <main data-component="Contact">
          <Loader loading={this.state.loading} />

          <div className="container">
            <PageHeader title="Contact" icon={faEnvelope} />

            <ContactForm
              data={this.state.contactForm.data}
              feedbackMessages={this.state.contactForm.messages}
              onSubmit={(values) => this.handleSubmitContactForm(values)}
            />
          </div>
        </main>
      </Layout>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // GET CONTACT FORM DATA
  getContactFormData() {
    MOCKY_INSTANCE.get(ENDPOINTS.contactForm.favoriteColors)
      .then(response => {
        this.setState((prevState, props) => {
          return {
            contactForm: {
              ...prevState.contactForm,
              data: {
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
            loading: false
          };
        });
      });
  }


  // HANDLE SUBMIT CONTACT FORM
  handleSubmitContactForm(values) {
    console.log('Form submitted:', values);

    this.setState((prevState, props) => {
      return {
        contactForm: {
          ...prevState.contactForm,
          messages: {
            ...prevState.contactForm.messages,
            success: 'Message sent successfully.'
          }
        }
      };
    });
  }

}

export default Contact;
