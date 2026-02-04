import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from './empty';
import { Button } from './button';

const meta = {
  title: 'UI/Display/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty className="w-[500px]">
      <EmptyHeader>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filter to find what you're looking for.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Empty className="w-[500px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">📁</EmptyMedia>
        <EmptyTitle>No files yet</EmptyTitle>
        <EmptyDescription>
          Get started by uploading your first file.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Upload File</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Empty className="w-[500px]">
      <EmptyHeader>
        <EmptyTitle>Your cart is empty</EmptyTitle>
        <EmptyDescription>
          Looks like you haven't added anything to your cart yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Start Shopping</Button>
      </EmptyContent>
    </Empty>
  ),
};
