import { z } from 'zod';

export const FormSchema = z.object({
  input: z.string().min(4, 'minLength: 4, maxLength: 8, only latin letters'),
  customColorName: z.string(),
  isVerified: z.boolean().refine((bool) => bool, {
    message: 'You must accept something',
  }),
});

export const colorOptions = [
  {
    value: 'blue',
    label: 'Blue',
  },
  {
    value: 'green',
    label: 'Green',
  },
];

// Enum definition for supported colors
enum Color {
  Blue = 'blue',
  Green = 'green',
  // Add more colors as needed
}

type ColorMapType = {
  [key in Color]: string;
};

export const colorMap: ColorMapType = {
  [Color.Blue]: 'focus:ring-blue-500',
  [Color.Green]: 'focus:ring-green-500',
};