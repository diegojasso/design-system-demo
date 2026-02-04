import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calendar } from './calendar';
import { useState } from 'react';

const meta = {
  title: 'UI/Form/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={selected} onSelect={setSelected} />;
  },
};

export const Multiple: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date[] | undefined>([]);
    return <Calendar mode="multiple" selected={selected} onSelect={setSelected} />;
  },
};

export const Range: Story = {
  render: () => {
    const [selected, setSelected] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>();
    return <Calendar mode="range" selected={selected} onSelect={setSelected} />;
  },
};

export const WithDropdown: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        captionLayout="dropdown"
      />
    );
  },
};
