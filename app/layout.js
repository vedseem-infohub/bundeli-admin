import "./globals.css";

export const metadata = {
  title: "Bundeli Kalavrat | Royal Atelier Admin Panel",
  description:
    "Curatorial management system for Bundeli Kalavrat heritage artworks, banners, categories, patrons, news, and essays.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F4EA] text-[#292522]">
        {children}
      </body>
    </html>
  );
}
