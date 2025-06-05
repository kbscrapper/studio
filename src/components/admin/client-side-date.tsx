
"use client";

import { useState, useEffect } from 'react';

interface ClientSideDateProps {
  dateString: string;
}

export function ClientSideDate({ dateString }: ClientSideDateProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (dateString) {
      // Basic error handling for invalid date strings
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          setFormattedDate('Invalid Date');
        } else {
          setFormattedDate(date.toLocaleDateString());
        }
      } catch (error) {
        setFormattedDate('Invalid Date');
      }
    } else {
      setFormattedDate('-');
    }
  }, [dateString]);

  return <>{formattedDate || '...'}</>;
}
