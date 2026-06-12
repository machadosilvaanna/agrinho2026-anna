// Aguarda o carregamento total do DOM
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. ROLAGEM SUAVE PARA OS LINKS DO MENU
    const linksDoMenu = document.querySelectorAll('nav ul li a');

    linksDoMenu.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Evita o comportamento padrão de pulo

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calcula a altura do menu para não cobrir o título da seção
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth' // Faz o efeito de deslizar
                });
            }
        });
    });

    // 2. EFEITO NO MENU AO ROLAR A PÁGINA
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
            header.style.padding = "5px 0"; // Reduz o tamanho do menu sutilmente
        } else {
            header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
            header.style.padding = "0"; // Volta ao tamanho original (controlado pelo CSS)
        }
    });

    // 3. ANIMAÇÃO DE SURGIMENTO (ELEMENTOS APARECENDO AO ROLAR)
    // Seleciona os cartões e a tabela para animar
    const elementosParaAnimar = document.querySelectorAll('.card, table');

    // Configura o observador para detectar quando os elementos aparecem na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, {
        threshold: 0.15 // Ativa a animação quando 15% do elemento estiver visível
    });

    // Aplica o estilo inicial oculto e inicia a observação
    elementosParaAnimar.forEach(elemento => {
        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(30px)";
        elemento.style.transition = "all 0.6s ease-out";
        observer.observe(elemento);
    });
});