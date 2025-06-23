export default function Footer() {
  return (
    <footer className="bg-accent text-text-accent border-t border-secondary mt-auto">
      <div className="container mx-auto py-4 text-center text-sm">
        <p className="mx-2 wrap-normal">
          &copy; {new Date().getFullYear()} Anniely Mariah Soares de Medeiros. Este é um protótipo de uso livre, apenas de caratér avaliativo para seleção da Knex.
        </p>
        <p>
          <a href="/privacy-policy" className="text-text-accent hover:text-text-accent-secondary">
            Exemplo 1
          </a>
          {" | "}
          <a href="/terms-of-service" className="text-text-accent hover:text-text-accent-secondary">
            Exemplo 2
          </a>
        </p>
      </div>  
    </footer>
  );
}
