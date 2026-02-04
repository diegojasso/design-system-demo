import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Spinner } from './spinner';

const meta = {
  title: 'UI/Display/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Spinner />,
};

export const Large: Story = {
  render: () => <Spinner className="size-8" />,
};

export const Small: Story = {
  render: () => <Spinner className="size-3" />,
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner />
      <span>Loading...</span>
    </div>
  ),
};
