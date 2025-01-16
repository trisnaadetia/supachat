import { Button } from "../../components/ui/button"; // Replace with the correct import path
import { Loader2 } from "lucide-react"; // Spinner icon from lucide-react

type LoadingButtonProps = {
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  onClick,
  disabled,
}) => {
  return (
    <Button className="w-full rounded-xl" onSubmit={onClick} disabled={isLoading || disabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
