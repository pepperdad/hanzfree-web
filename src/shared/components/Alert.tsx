import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@shared/components/shadcn/ui/alert-dialog';

interface AlertProps {
  onAlert: {
    message: string;
    open: boolean;
  };
  setOnAlert: (alert: { message: string; open: boolean }) => void;
}

const Alert = ({ onAlert, setOnAlert }: AlertProps) => {
  return (
    <div>
      <AlertDialog open={onAlert.open} onOpenChange={(open) => setOnAlert({ ...onAlert, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>HanzFree&apos;s message</AlertDialogTitle>
            <AlertDialogDescription>{onAlert.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className='bg-blue-500 hover:bg-blue-700'>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Alert;
