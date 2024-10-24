import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Active, DataRef, Over } from '@dnd-kit/core';
import { ColumnDragData } from '@/components/kanban/board-column';
import { TaskDragData } from '@/components/kanban/task-card';

type DraggableData = ColumnDragData | TaskDragData;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true;
  }

  return false;
}

export const getErrorMessage = (error: string | null): string => {
  switch (error) {
    case 'CredentialsSignin':
      return 'Invalid credentials. Please try again.';
    case 'OAuthSignin':
      return 'Error with OAuth sign-in. Please try again.';
    case 'OAuthCallback':
      return 'OAuth callback error. Please try again.';
    case 'EmailCreateAccount':
      return 'Error creating account with email. Please try again.';
    default:
      return 'An unknown error occurred. Please try again.';
  }
};