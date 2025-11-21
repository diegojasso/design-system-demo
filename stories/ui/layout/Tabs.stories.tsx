import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const meta = {
  title: 'UI/Layout/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 border rounded-md">
          Make changes to your account here.
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 border rounded-md">
          Change your password here.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4 border rounded-md">Overview content</div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4 border rounded-md">Analytics content</div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4 border rounded-md">Reports content</div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 border rounded-md">Notifications content</div>
      </TabsContent>
    </Tabs>
  ),
};
