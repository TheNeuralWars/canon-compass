import "./globals.css";
export const metadata = { title: "Canon Compass — taste-aware lore agent (Qloo)", description: "Your taste, mapped to the perfect way into a story universe — powered by Qloo's cultural affinity graph." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
