export const metadata = { title: "Canon Compass", description: "Taste-aware lore agent powered by Qloo" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body style={{ fontFamily: "system-ui", background: "#0b0d12", color: "#e7e9ee", maxWidth: 760, margin: "0 auto", padding: 24 }}>{children}</body></html>;
}
