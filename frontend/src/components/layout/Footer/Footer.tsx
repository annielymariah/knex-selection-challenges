export default function Footer() {
  return (


    <footer className="bg-accent text-text-accent border-t border-secondary mt-auto"> {/* Footer */}
      <div className="container mx-auto py-4 text-center text-sm">
        <p className="mx-2 wrap-normal">
          &copy; {new Date().getFullYear()} Anniely Mariah Soares de Medeiros. Este é um protótipo de uso livre, apenas de carater avaliativo para seleção da Knex.
        </p>
        <p>
          <a href="#" className="text-text-accent hover:text-text-accent-secondary">
            Exemplo 1
          </a>
          {" | "}
          <a href="#" className="text-text-accent hover:text-text-accent-secondary">
            Exemplo 2
          </a>
        </p>
      </div>  
    </footer>
  );
}
