export interface HeaderProps {
  backVisible?: boolean;
  onBack?: () => void;
}

export const Header = (): React.ReactElement => {
  return (
    <header className="w-full bg-red-600 shadow-md sticky top-0 z-20">
      <div className="max-w-[1280px] mx-auto flex items-center justify-center relative px-4 py-3 md:py-4">
        <img
          src={`${import.meta.env.BASE_URL}/qantas.svg`}
          alt="Qantas Logo"
          className="h-10 md:h-12 mr-1 select-none drag-none"
        />
        <span className="text-xl md:text-2xl font-bold text-white select-none text-center">
          Airport Directory
        </span>
      </div>
    </header>
  );
};
