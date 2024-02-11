import { forwardRef } from 'react';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
// hooks

// ----------------------------------------------------------------------

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction='up' ref={ref} {...props} />
);

type IPropsType = {
  value: boolean;
  isLoading?: boolean;
  onFalse: () => void;
  onTrue: () => void;
  children?: React.ReactNode;
  falseText?: string;
  trueText?: string;
  title?: string;
  trueActionType?: 'text' | 'outlined' | 'contained' | 'soft';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export default function TransitionsDialog({
  value,
  onFalse,
  children,
  onTrue,
  falseText = 'Disagree',
  trueText = 'Agree',
  title = 'Do Something',
  trueActionType = 'contained',
  size = 'sm',
  isLoading = false,
}: IPropsType) {
  return (
    <div>
      <Dialog
        keepMounted
        open={value}
        TransitionComponent={Transition}
        onClose={!isLoading ? onFalse : () => {}}
        maxWidth={size}
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent sx={{ color: 'text.secondary' }}>
          {children}
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' onClick={onFalse} disabled={isLoading}>
            {falseText}
          </Button>
          <Button
            variant={trueActionType}
            onClick={onTrue}
            disabled={isLoading}
            autoFocus
          >
            {trueText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
