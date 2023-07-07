// SnackbarUtils.tsx
import React from 'react';
import { useSnackbar, VariantType } from 'notistack';

let useSnackbarRef:
  | {
      enqueueSnackbar: (msg: string, options: { variant: VariantType }) => void;
    }
  | null = null;

export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

const toast = (msg: string, variant: VariantType = 'default') => {
  if (useSnackbarRef) {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  } else {
    console.error('useSnackbarRef is not initialized');
  }
};

const SnackbarUtils = {
  success(msg: string) {
    toast(msg, 'success');
  },
  warning(msg: string) {
    toast(msg, 'warning');
  },
  info(msg: string) {
    toast(msg, 'info');
  },
  error(msg: string) {
    toast(msg, 'error');
  },
};

export default SnackbarUtils;
