import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const meta = {
  title: 'UI/Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label text',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <Label htmlFor="required">
      Name <span className="text-destructive">*</span>
    </Label>
  ),
};
