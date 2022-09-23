import React from 'react';

import { getFieldClass, getFieldErrorMessage } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

{
  /* <template>
  <label :class="labelClass" :for="state.name">{{ label }}</label>
  <input
    :id="state.name"
    :class="[...getFieldClass(isFormSubmitted, state, baseClasses), ...props.class.split(' ')]"
    :type="type"
    :name="state.name"
    v-model="model"
    ref="fieldRef"
  />
  <div class="invalid-feedback" v-for="errorMessage in state.errorMessages">
    {{ errorMessage }}
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/composables';
type Props = {
  labelClass?: string;
  label: string;
  baseClasses?: string[];
  class?: string;
  type?: string;
  field: UseField<any>;
  isFormSubmitted: Ref<boolean>;
};
const props = withDefaults(defineProps<Props>(), {
  labelClass: 'form-label',
  class: '',
  type: 'text',
});
const { field, isFormSubmitted } = props;
const { model, ref: fieldRef, state } = field;
</script> */
}

type Props = {
  labelClass?: string;
  label: string;
  baseClasses?: string;
  className?: string;
  type?: string;
  field: UseField<any>;
  isFormSubmitted: boolean;
};

const Input = ({
  labelClass,
  label,
  baseClasses,
  className,
  type,
  field,
  isFormSubmitted,
  ...otherProps
}: Props) => {
  const { value, state } = field;
  const { errorMessages } = state;

  return (
    <>
      <label className={labelClass} htmlFor={state.name}>
        {label}
      </label>
      <input
        id={state.name}
        className={`${getFieldClass(isFormSubmitted, state, baseClasses)} ${className}`}
        type={type}
        name={state.name}
        value={value}
        ref="fieldRef"
        {...otherProps}
      />
      {errorMessages.map(errorMessage => (
        <div className="invalid-feedback">{errorMessage}</div>
      ))}
      {/* getFieldErrorMessage(errors.password) */}
    </>
  );
};

export default Input;
