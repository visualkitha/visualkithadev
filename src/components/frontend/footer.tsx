export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Visual Kitha CMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
