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

// utils/api.js

// GET request with JWT token
export async function fetchDataWithAuth(url: RequestInfo | URL, token: any) {
  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('GET request error:', error);
      throw error;
  }
}

// POST request with JWT token and data
export async function postDataWithAuth(url: RequestInfo | URL, data: any, token: any) {
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('POST request error:', error);
      throw error;
  }
}
