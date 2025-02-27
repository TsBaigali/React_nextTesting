import './styles/globals.css'; // Import your global styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      
        {children}
        
      </body>
    </html>
  );
}
