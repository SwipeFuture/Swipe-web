// A real screenshot from one of the Swipe apps in a simple flat phone frame (no glass, no glare).
// Screens live in public/app-screens/<app>/0X.webp (640×1385, from the App Store screenshots).
export default function PhoneShot({ src, alt, className = "", style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-[38px] bg-[#121212] p-[7px] shadow-[0_8px_0_#00000026] ${className}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={640} height={1385} loading="lazy" className="block h-auto w-full rounded-[31px]" />
    </div>
  );
}
