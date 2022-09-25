import { useEffect } from 'react';

import { ContactFormState } from '@/pages/Contact/_files/types';
import { required, requiredEmail, requiredMin, custom } from '@/shared/files/validations';
import { validateForm, setFields } from '@/shared/helpers';
import { useCustomState, useField } from '@/shared/hooks';
import { getFavoriteColors } from '@/core/services';
import {
  AlertDismissible,
  Loader,
  Input,
  Checkbox,
  RadioButton,
  Select,
  Textarea,
} from '@/shared/components';

const initialState: ContactFormState = {
  isLoading: true,
  isFormSubmitted: false,
  favoriteColors: [],
  successMessages: [],
};

const Form = () => {
  const [state, setState] = useCustomState<ContactFormState>(initialState);
  const { isLoading, isFormSubmitted, favoriteColors, successMessages } = state;

  const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
  const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
  const email = useField({ name: 'email', validation: requiredEmail });
  const telephone = useField({ name: 'telephone', validation: requiredMin(8) });
  const sex = useField({ name: 'sex', validation: required });
  const favoriteColor = useField({
    name: 'favorite-color',
    defaultValue: 'select',
    validation: required,
  });
  const { value: favoriteColorValue, state: favoriteColorState } = favoriteColor;
  const employed = useField<boolean>({ name: 'employed', defaultValue: false });
  const message = useField({ name: 'message', validation: required });

  const setFavoriteColors = async () => {
    try {
      const response = await getFavoriteColors();
      setState({ favoriteColors: response });
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const reset = () => {
    setState({ isFormSubmitted: false });

    setFields({
      fields: [firstName, lastName, email, telephone, sex, message],
      value: '',
      reset: { required: true },
    });
    setFields({
      fields: [favoriteColor],
      value: 'select',
      reset: { required: true },
    });
    setFields({
      fields: [employed],
      value: false,
      reset: { required: false },
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState({ isFormSubmitted: true });

    const isValidForm = validateForm([
      { fields: [firstName, lastName], validation: requiredMin(2) },
      { fields: [email], validation: requiredEmail },
      { fields: [telephone], validation: requiredMin(8) },
      { fields: [sex, message], validation: required },
      {
        fields: [favoriteColor],
        validation: custom(favoriteColorValue !== 'select', 'Value required.'),
      },
    ]);
    if (!isValidForm) return;

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

    setState({ successMessages: ['Message sent successfully.'] });

    reset();
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setFavoriteColors();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />

      <form data-component="Form" className="auth-form" onSubmit={handleSubmit}>
        {successMessages.map(successMessage => (
          <AlertDismissible
            key={successMessage}
            variant="success"
            onDismiss={() => setState({ successMessages: [] })}
          >
            {successMessage}
          </AlertDismissible>
        ))}

        <div className="row">
          <div className="col mb-3">
            <Input label="First name" field={firstName} isFormSubmitted={isFormSubmitted} />
          </div>

          <div className="col mb-3">
            <Input label="Last name" field={lastName} isFormSubmitted={isFormSubmitted} />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <Input
              type="email"
              label="E-mail address"
              field={email}
              isFormSubmitted={isFormSubmitted}
            />
          </div>

          <div className="col mb-3">
            <Input label="Telephone" field={telephone} isFormSubmitted={isFormSubmitted} />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <RadioButton
              field={sex}
              radios={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              isFormSubmitted={isFormSubmitted}
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <Select
              label="Favorite color"
              className={`${
                favoriteColorState.touched && favoriteColorValue === 'select' ? 'is-invalid' : ''
              }`}
              field={favoriteColor}
              isFormSubmitted={isFormSubmitted}
            >
              <option value="select" disabled>
                Select
              </option>
              {favoriteColors.map(({ text, value }) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </Select>
          </div>
          <div className="col mt-4">
            <div className="form-check">
              <Checkbox
                label="Employed"
                trueValue
                falseValue={false}
                field={employed}
                isFormSubmitted={isFormSubmitted}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <Textarea label="Message" field={message} isFormSubmitted={isFormSubmitted} />
        </div>

        <button className="btn btn-primary me-2" type="submit">
          Send
        </button>
        <button className="btn btn-light" type="button" onClick={reset}>
          Reset form
        </button>
      </form>
    </>
  );
};

export default Form;
