import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Slider } from './slider';

const meta = {
  title: 'UI/Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} {...args} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const CustomRange: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[0]} min={0} max={10} step={0.5} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} disabled />
    </div>
  ),
};
