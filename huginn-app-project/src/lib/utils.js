import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// function that fransform a uInt8Array to hex for easy transfer | <uint8Array>
export const uInt8ArrayToHex = (uint8Array) =>
  Array.from(uint8Array)
  .map((el) => el.toString(16).padStart(2,'0'))
  .join('');

// function that format a date for a relative datetime format | <dateString>: iso string
export const timeFormat = (dateString) => {
  const date = new Date(dateString);
  const current = new Date();
  let fmt = 'dd MMMM';

  if (date.getFullYear !== current.getFullYear) {
    fmt = 'dd/MM/yy'
  }
  else if (date.getMonth === current.getMonth && date.getDate === current.getDate ) {
    fmt = 'HH:mm'
  }

  return format(date, fmt)
}

// function that used to to shorten a string given | <str>: string to shorten <ln> length desired
export const shorterStr = (str,ln) => {
  if(str?.length > ln) {
    return `${str.slice(0,ln)}..`
  }
  return str
}

// generate a unique random string
export function generateUniqueStr() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
