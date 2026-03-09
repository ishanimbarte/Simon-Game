export default function SimonButton({ color, onClick, flash }) {

  const colorMap = {
    red: "bg-[#FF8F8F]",
    green: "bg-[#FFF1CB]",
    yellow: "bg-[#C2E2FA]",
    blue: "bg-[#B7A3E3]"
  };

  return (
    <button
      onClick={() => onClick(color)}
      className={`
        h-32 w-32 rounded-2xl border-4 border-gray-800
        ${colorMap[color]}
        ${flash ? "brightness-200 scale-110" : ""}
        transition-all duration-200
      `}
    />
  );
}