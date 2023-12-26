'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { colorOptions, FormSchema } from '@/const';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconSpinner } from '@/components/icons';
import SearchComponent from '@/components/SearchComponent';

const FormComponent = () => {
  const [color, setColor] = useState('blue');
  const [posts, setPosts] = useState([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      input: '',
      customColorName: 'blue',
      isVerified: false,
    },
  });

  // Determine the ring color class based on the `isBlue` state
  const ringColorClass = color === 'blue' ? 'focus:ring-blue-500' : 'focus:ring-green-500';

  // This function toggles the ring color between blue and green
  const toggleRingColor = (color: string) => {
    setColor(color);
  };

  const isLoading = form.formState.isSubmitting;

  const onSetValue = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    form.setValue('input', 'Value Template');
  };
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      console.log(values);
      const res = await axios('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="px-4 lg:px-8">
      <h1 className="text-3xl font-bold text-white">
        Feel free to contact us.
      </h1>
      <Form {...form}>
        <FormDescription>
          Please fill out the form.
        </FormDescription>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="customColorName"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <FormLabel>Select custom color</FormLabel>
                <Select
                  onValueChange={(color) => {
                    field.onChange(color);
                    toggleRingColor(color);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select custom color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type some text</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Standard" {...field}
                    className={ringColorClass}
                  />
                </FormControl>
                <Button variant="secondary" onClick={onSetValue}>
                  Set input value
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isVerified"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Test
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="secondary" type="submit">
            {isLoading && <IconSpinner className="mr-5 animate-spin" />}
            {isLoading ? 'Processing...' : 'Submit'}
          </Button>
        </form>
      </Form>
      {posts.length > 0 && <SearchComponent data={posts} />}
    </div>
  );
};

export default FormComponent;