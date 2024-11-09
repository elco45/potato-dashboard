import { DarkModeCheckbox } from '@/pages/Auth/components/DarkModeCheckbox';
import { AuthTabs } from '@/pages/Auth/components/AuthTabs';

export const Auth = () => {
  return (
    <div className="flex justify-center w-full h-screen items-center dark:bg-[#121212] bg-white">
      <div className="flex flex-col gap-6 max-w-[438px] w-full">
        <DarkModeCheckbox />
        <AuthTabs />
      </div>
    </div>
  );
};
