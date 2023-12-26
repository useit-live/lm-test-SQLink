import { z } from 'zod';
export const FormSchema = z.object({
  input: z.string()
    .min(4, 'minLength: 4, maxLength: 8, only latin letters')
    .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'Name should contain only alphabets'),
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