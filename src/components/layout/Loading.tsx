import { Spinner } from "../../components/common";

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
};
