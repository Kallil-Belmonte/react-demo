import { FieldNode } from 'node_modules/vue-hooks-form/dist/src/utils.d';

export type BootstrapVariants =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export type VueHooksFormField = {
  value: any;
  error:
    | {
        message: string;
        field: string;
      }[]
    | undefined;
  ref: (nodeRef: FieldNode) => void;
  validate: () => Promise<any>;
};
