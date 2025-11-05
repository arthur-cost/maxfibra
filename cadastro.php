<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAX FIBRA - Cadastro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        .cadastro-section {
            padding: 100px 0;
        }

        .cadastro-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            position: relative;
        }

        .cadastro-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            border-radius: 20px 20px 0 0;
        }

        .cadastro-title {
            text-align: center;
            margin-bottom: 30px;
            color: var(--primary-color);
            font-family: 'Montserrat', sans-serif;
            font-size: 2.5rem;
        }

        .btn-voltar {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
            padding: 10px 20px;
            border: 2px solid var(--primary-color);
            border-radius: 50px;
            transition: var(--transition);
        }

        .btn-voltar:hover {
            background: var(--primary-color);
            color: white;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    
    <div class="animated-bg">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
    </div>

    <header id="header">
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="logo">
                    <span class="logo-text">MAX FIBRA</span>
                    <div class="logo-dot"></div>
                </a>
                <ul class="nav-links">
                    <li><a href="index.html#home" class="nav-link">EMPRESA</a></li>
                    <li><a href="index.html#clients" class="nav-link">CLIENTES</a></li>
                    <li><a href="index.html#services" class="nav-link">SERVIÇOS</a></li> 
                    <li><a href="index.html#contact" class="nav-link">CONTATO</a></li>
                    <li><a href="cadastro.php" class="nav-link">CADASTRO</a></li>
                </ul>
                <div class="menu-toggle">
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </div>
    </header>

    <section class="cadastro-section">
        <div class="container">
            <a href="index.html" class="btn-voltar">
                <i class="fas fa-arrow-left"></i>
                Voltar para Home
            </a>
            
            <div class="cadastro-container">
                <h1 class="cadastro-title">Solicitar Avaliação</h1>
                
                <form action="processa_cadastro.php" method="POST">
                    <div class="form-group">
                        <label for="nome">Nome Completo *</label>
                        <input type="text" id="nome" name="nome" class="form-control" placeholder="Seu nome completo" required>
                    </div>

                    <div class="form-group">
                        <label for="telefone">Telefone/WhatsApp *</label>
                        <input type="tel" id="telefone" name="telefone" class="form-control" placeholder="(11) 99999-9999" required>
                    </div>

                    <div class="form-group">
                        <label for="plano">Plano Desejado *</label>
                        <select id="plano" name="plano" class="form-control" required>
                            <option value="">Selecione um plano</option>
                            <option value="100 Mbps">Básico - 100 Mbps</option>
                            <option value="300 Mbps">Premium - 300 Mbps</option>
                            <option value="1 Gbps">Empresarial - 1 Gbps</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="endereco">Endereço para Avaliação *</label>
                        <textarea id="endereco" name="endereco" class="form-control" placeholder="Rua, número, bairro, cidade - CEP" rows="4" required></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%;">
                        <span>Solicitar Avaliação</span>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    </section>

    <script src="script.js"></script>
</body>
</html>