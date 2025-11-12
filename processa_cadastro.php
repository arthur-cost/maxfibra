<?php

$host = 'localhost';
$dbname = 'maxfibra';
$username = 'root';
$password = '';

try {
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $sql = "CREATE TABLE IF NOT EXISTS cadastros (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        plano VARCHAR(50) NOT NULL,
        endereco TEXT NOT NULL,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);

} catch(PDOException $e) {
    
    file_put_contents('erro_log.txt', "Erro BD: " . $e->getMessage() . PHP_EOL, FILE_APPEND);
    $pdo = null;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $nome = htmlspecialchars($_POST['nome']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $plano = htmlspecialchars($_POST['plano']);
    $endereco = htmlspecialchars($_POST['endereco']);

    if ($pdo) {
        try {
            
            $stmt = $pdo->prepare("INSERT INTO cadastros (nome, telefone, plano, endereco) VALUES (?, ?, ?, ?)");
            $stmt->execute([$nome, $telefone, $plano, $endereco]);
            
            $mensagem = "Cadastro realizado com sucesso! Entraremos em contato em breve.";
            $tipo = "success";
            
        } catch(PDOException $e) {
            $mensagem = "Erro ao salvar no banco de dados. Seus dados foram salvos em arquivo local.";
            $tipo = "warning";
            
            
            $dados = "Nome: $nome | Telefone: $telefone | Plano: $plano | Endereço: $endereco" . PHP_EOL;
            file_put_contents('cadastros_backup.txt', $dados, FILE_APPEND);
        }
    } else {
        
        $dados = "Nome: $nome | Telefone: $telefone | Plano: $plano | Endereço: $endereco" . PHP_EOL;
        file_put_contents('cadastros_backup.txt', $dados, FILE_APPEND);
        
        $mensagem = "Cadastro salvo localmente! Entraremos em contato em breve.";
        $tipo = "success";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAX FIBRA - Cadastro Realizado</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        .resultado-container {
            max-width: 600px;
            margin: 100px auto 50px;
            padding: 40px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .success { color: #28a745; }
        .warning { color: #ffc107; }
        .error { color: #dc3545; }

        .icone-grande {
            font-size: 4rem;
            margin-bottom: 20px;
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
            </nav>
        </div>
    </header>

    <section>
        <div class="container">
            <div class="resultado-container">
                <?php if(isset($mensagem)): ?>
                    <div class="icone-grande <?php echo $tipo; ?>">
                        <?php if($tipo == 'success'): ?>
                            <i class="fas fa-check-circle"></i>
                        <?php elseif($tipo == 'warning'): ?>
                            <i class="fas fa-exclamation-triangle"></i>
                        <?php else: ?>
                            <i class="fas fa-times-circle"></i>
                        <?php endif; ?>
                    </div>
                    <h2 class="<?php echo $tipo; ?>"><?php echo $mensagem; ?></h2>
                    <p style="margin: 20px 0;">Agradecemos seu interesse na MAX FIBRA!</p>
                <?php endif; ?>
                
                <div style="margin-top: 30px;">
                    <a href="cadastro.php" class="btn btn-primary" style="margin-right: 10px;">
                        <i class="fas fa-plus"></i> Novo Cadastro
                    </a>
                    <a href="index.html" class="btn" style="background: #6c757d; color: white;">
                        <i class="fas fa-home"></i> Voltar para Home
                    </a>
                </div>
            </div>
        </div>
    </section>

</body>
    
</html>
