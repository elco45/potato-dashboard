import { Checkbox } from '@/components/ui/checkbox';

export const CheckBoxToggle = ({
  id,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  description: string;
  checked: boolean;
  onCheckedChange: (val: boolean) => void;
}) => {
  return (
    <div className="flex items-center space-x-2 text-[#121212] dark:text-white">
      <Checkbox
        id={id}
        className="dark:bg-transparent border-none text-[#121212] dark:text-white bg-[#121212]"
        onCheckedChange={checked => onCheckedChange(!!checked)}
        checked={checked}
      />
      <label
        htmlFor="darkMode"
        className="text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {description}
      </label>
    </div>
  );
};
