import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ImageUploader } from '../index';

export default {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  argTypes: {
    maxFileSize: { control: 'number' },
    maxFiles: { control: 'number' },
    enableCrop: { control: 'boolean' },
    cropAspectRatio: { control: 'number' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} as Meta<typeof ImageUploader>;

const Template: StoryFn<any> = (args) => <ImageUploader {...args} />;

export const Default = Template.bind({});
Default.args = {
  maxFileSize: 5,
  maxFiles: 1,
  placeholder: 'Drag & drop images here or click to select',
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  maxFileSize: 5,
  maxFiles: 5,
  placeholder: 'Drag & drop images here or click to select (max 5 files)',
};

export const WithCropping = Template.bind({});
WithCropping.args = {
  maxFileSize: 10,
  maxFiles: 1,
  enableCrop: true,
  cropAspectRatio: 16/9,
  placeholder: 'Drag & drop image here or click to select (will open crop modal)',
};

export const Disabled = Template.bind({});
Disabled.args = {
  maxFileSize: 5,
  maxFiles: 1,
  disabled: true,
  placeholder: 'Uploader is disabled',
};