import Navigation from "@/components/global/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-16 bg-surface">
      <Navigation />
      {children}
    </div>
  );
}
