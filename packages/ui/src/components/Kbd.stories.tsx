import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Kbd, KbdGroup } from './kbd';

const meta = {
  title: 'UI/Display/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
};

export const SingleKey: Story = {
  render: () => <Kbd>K</Kbd>,
};

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const MultipleKeys: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <span className="text-sm">to open command palette</span>
    </div>
  ),
};
