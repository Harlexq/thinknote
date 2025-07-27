import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="scroll-box">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
