/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import myBad from '@/assets/myBad.gif';
import { cn } from '@/lib/utils';

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

export const LoginTab = ({ n }: { n: number }) => {
  const onSubmit = (_: { username: string; password: string }) => {
    if (n === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `<div><img src="${myBad}" style="max-width: 24vw;" />
        <p style="font-size: 28px;">You might be correct, but I forgot your credentials. Please try signing up again.</p>
        </div>`,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure to sign up first',
      });
    }
  };

  return <AuthTab title="Login" tabName="login" onSubmit={onSubmit} />;
};

export const SignUpTab = ({ n }: { n: number }) => {
  const navigate = useNavigate();

  const onSubmit = ({ password }: { username: string; password: string }) => {
    let message = '';

    if (n === 1 && password === 'Tomato') {
      navigate('/dashboard?n=1');
      return;
    }
    if (n !== 1 && password === 'Potato') {
      navigate('/dashboard');
      return;
    }

    if (password.length < 6) {
      message = 'Password must be at <strong>least 6</strong> characters long';
    } else if (password.length > 6) {
      message = 'Password must be at <strong>most 6</strong> characters long';
    } else if (/\d/.test(password)) {
      message = 'Password must not contain a number';
    } else if (!/[A-Z]/.test(password)) {
      message = 'Password must contain an uppercase letter';
    } else if (n === 1) {
      message = 'Password is not <strong>"Tomato"</strong>';
    } else {
      message = 'Password is not <strong>"Potato"</strong>';
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      html: `<p style="font-size: 32px;">${message}</p>`,
    });
  };

  return <AuthTab title="Sign Up" tabName="signUp" onSubmit={onSubmit} />;
};

export const AuthTabs = () => {
  const [searchParams] = useSearchParams();
  const n = searchParams.get('n') ? parseInt(searchParams.get('n')!) : 0;

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 p-0">
        <TabsTrigger
          className={cn(
            'bg-transparent border-4 border-solid border-[#121212] text-[#121212] rounded-none text-lg cursor-pointer',
            'dark:bg-[#121212] dark:text-[#121212] data-[state=active]:bg-[#121212] data-[state=active]:text-white dark:data-[state=active]:text-[#121212]',
          )}
          value="login"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          className={cn(
            'bg-transparent border-4 border-solid border-[#121212] text-[#121212] rounded-none text-lg border-l-0 cursor-pointer',
            'dark:bg-[#121212] dark:text-[#121212] data-[state=active]:bg-[#121212] data-[state=active]:text-white dark:data-[state=active]:text-[#121212]',
          )}
          value="signUp"
        >
          SignUp
        </TabsTrigger>
      </TabsList>
      <LoginTab n={n} />
      <SignUpTab n={n} />
    </Tabs>
  );
};
