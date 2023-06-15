import "./globals.css";

export const metadata = {
  title: "Type Script Todo List",
  description: "First Project of Typescript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
