'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Medication } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Medication>[] = [
 
  {
    accessorKey: 'medication',
    header: 'Medication'
  },
  {
    accessorKey: 'dose',
    header: 'Dose'
  },
  {
    accessorKey: 'morning',
    header: 'Morning'
  },
  {
    accessorKey: 'afternoon',
    header: 'Afternoon'
  },
  {
    accessorKey: 'evening',
    header: 'Evening'
  }, 
  {
    accessorKey: 'night',
    header: 'Night'
  },
  {
    accessorKey: 'duration',
    header: 'Duration'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'inst',
    header: 'Inst'
  },
   
];
