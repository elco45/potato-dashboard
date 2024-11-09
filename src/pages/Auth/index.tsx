import { DarkModeCheckbox } from '@/pages/Auth/components/DarkModeCheckbox';
import { AuthTabs } from '@/pages/Auth/components/AuthTabs';

export const Auth = () => {
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <div className="flex flex-col">
        <DarkModeCheckbox />
        <AuthTabs />
      </div>
    </div>
  );
};
