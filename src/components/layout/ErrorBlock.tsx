export interface ErrorBlockProps {
  title: string;
}

export const ErrorBlock = ({ title }: ErrorBlockProps) => {
  return (
    <div className="bg-grey-100 rounded-2xl py-6 px-6 md:px-8 flex flex-col items-center">
      <img
        src="/images/art-error-robot.png"
        alt="Illustration of a puzzle"
        className="w-[300px] object-contain mb-6"
      />
      <p className="font-semibold text-center">{title}</p>
    </div>
  );
};
