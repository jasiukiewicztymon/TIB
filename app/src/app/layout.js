import "./globals.css";

export const metadata = {
  title: "Point",
  description: "Point, an app to organize your workspaces",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}