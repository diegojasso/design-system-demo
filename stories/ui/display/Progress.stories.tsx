import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Progress } from '@/components/ui/progress';

const meta = {
  title: 'UI/Display/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <Progress value={50} {...args} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={0} />
    </div>
  ),
};

export const Half: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={50} />
    </div>
  ),
};

export const Complete: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={100} />
    </div>
  ),
};
