export interface HeaderProps {
  backVisible?: boolean;
  onBack?: () => void;
}

export const Header = (): React.ReactElement => {
  return (
    <header className="w-full bg-red-600 shadow-md sticky top-0 z-20">
      <div className="max-w-[1280px] mx-auto flex items-center justify-center relative px-4 py-3 md:py-4">
        <span className="text-xl md:text-2xl font-bold tracking-tight text-white select-none text-center w-full">
          Qantas Airports
        </span>
        {/* You can add more header actions here if needed */}
      </div>
    </header>
  );
};
