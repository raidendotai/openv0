import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export default function Fallback({ className }: Props) {
  return (
    <div>fallback for failed component load</div>
  );
}
