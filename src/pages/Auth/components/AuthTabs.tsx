import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const AuthTab = ({
  title,
  onSubmit,
  tabName,
}: {
  title: string;
  onSubmit: (val: { username: string; password: string }) => void;
  tabName: string;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TabsContent value={tabName}>
      <Card className="border-4 border-t-0 border-solid border-[#121212] rounded-none shadow-none p-6">
        <CardHeader className="px-0">
          <CardTitle className="text-[#121212]">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-0">
          <div className="space-y-1">
            <Label htmlFor="username" className="text-[#121212] text-lg">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              className="bg-transparent border-[#121212] border-solid px-0 rounded-none text-2xl text-[#121212]"
              onChange={e => {
                const val = e.target.value;
                setUsername(val);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="current" className="text-[#121212] text-lg">
              Password
            </Label>
            <Input
              id="current"
              type="password"
              className="bg-transparent border-[#121212] border-solid px-0 rounded-none text-[#121212]"
              value={password}
              onChange={e => {
                const val = e.target.value;
                setPassword(val);
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-5">
          <Button
            className="bg-transparent border-4 border-solid border-[#121212] text-[#121212] text-lg cursor-pointer"
            onClick={() => onSubmit({ username, password })}
          >
            {title}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export const LoginTab = () => {
  return <AuthTab title="Login" tabName="login" onSubmit={() => {}} />;
};

export const SignUpTab = () => {
  return <AuthTab title="Sign Up" tabName="signUp" onSubmit={() => {}} />;
};

export const AuthTabs = () => {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 p-0">
        <TabsTrigger
          className="bg-transparent border-4 border-solid border-[#121212] text-[#121212] rounded-none text-lg cursor-pointer"
          value="login"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          className="bg-transparent border-4 border-solid border-[#121212] text-[#121212] rounded-none text-lg border-l-0 cursor-pointer"
          value="signUp"
        >
          SignUp
        </TabsTrigger>
      </TabsList>
      <LoginTab />
      <SignUpTab />
    </Tabs>
  );
};
