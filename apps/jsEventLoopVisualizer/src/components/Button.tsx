import { activeButton, button } from '@/style.css';

export const Button = ({
  name,
  onClick,
  isActive,
}: {
  name: string;
  onClick: () => void;
  isActive?: boolean;
}) => {
  return (
    <button className={isActive ? activeButton : button} onClick={onClick}>
      {name}
    </button>
  );
};
