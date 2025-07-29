import { type FunctionComponent, useEffect, useState } from 'react';

import { getFavoriteColors } from '@/core/services';
import type { FavoriteColor } from '@/core/services/contact/types';
import {
  Alert,
  Button,
  Checkbox,
  Input,
  Loader,
  RadioButton,
  Select,
  Textarea,
} from '@/shared/components';
import { clearMessage } from '@/shared/helpers';
import { useField } from '@/shared/hooks';
import './Form.scss';

const Form: FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [favoriteColors, setFavoriteColors] = useState<FavoriteColor[]>([]);
  const [successMessages, setSuccessMessages] = useState<string[]>([]);

  const firstName = useField();
  const lastName = useField();
  const email = useField();
  const telephone = useField();
  const sex = useField();
  const favoriteColor = useField();
  const employed = useField<boolean>();
  const message = useField();

  const setInitialData = async () => {
    try {
      const response = await getFavoriteColors();
      setFavoriteColors(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    firstName.setValue('');
    lastName.setValue('');
    email.setValue('');
    telephone.setValue('');
    sex.setValue('');
    favoriteColor.setValue('');
    employed.setValue(false);
    message.setValue('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Form submitted:', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      telephone: telephone.value,
      sex: sex.value,
      favoriteColor: favoriteColor.value,
      employed: employed.value,
      message: message.value,
    });

    setSuccessMessages(['Message sent successfully.']);
    setTimeout(() => {
      setSuccessMessages([]);
    }, 3000);

    reset();
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setInitialData();
  }, []);

  return (
    <>
      <Loader loading={loading} />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col mb-15">
            <Input
              label="Name"
              name="first-name"
              required
              minLength={2}
              maxLength={150}
              placeholder="First name"
              field={firstName}
            />
          </div>

          <div className="col mb-15">
            <Input
              label="Last name"
              name="last-name"
              required
              minLength={2}
              maxLength={150}
              placeholder="Full last name"
              field={lastName}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-15">
            <Input
              icon="Email"
              label="E-mail"
              type="email"
              name="email"
              required
              placeholder="Enter your e-mail"
              field={email}
            />
          </div>

          <div className="col mb-15">
            <Input
              icon="Cellphone"
              label="Telephone"
              type="tel"
              name="telephone"
              required
              placeholder="Enter your telephone"
              field={telephone}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-15">
            <RadioButton
              title="Sex"
              name="sex"
              required
              radios={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              field={sex}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-15">
            <Select
              label="Favorite color"
              name="favorite-color"
              required
              options={favoriteColors}
              field={favoriteColor}
            />
          </div>
          <div className="col mt-25">
            <div className="form-check">
              <Checkbox label="Employed" name="employed" field={employed} />
            </div>
          </div>
        </div>

        <div className="mb-15">
          <Textarea
            label="Message"
            name="message"
            required
            minLength={3}
            maxLength={3000}
            placeholder="Write your message"
            field={message}
          />
        </div>

        {successMessages.map((errorMessage, index) => (
          <Alert
            key={errorMessage}
            status="success"
            onClose={() => clearMessage(setSuccessMessages, index)}
          >
            {errorMessage}
          </Alert>
        ))}

        <footer>
          <Button type="submit">Send</Button>
          <Button variant="base" onClick={reset}>
            Reset form
          </Button>
        </footer>
      </form>
    </>
  );
};

export default Form;
