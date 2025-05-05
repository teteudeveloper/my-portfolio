<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Função simples de sanitização
    function limpar_dado($dado) {
        return htmlspecialchars(strip_tags(trim($dado)));
    }

    // Sanitizar e validar os campos
    $nome = limpar_dado($_POST['nome'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $telefone = limpar_dado($_POST['telefone'] ?? '');
    $assunto = limpar_dado($_POST['assunto'] ?? '');
    $mensagem = limpar_dado($_POST['mensagem'] ?? '');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('E-mail inválido.'); window.location.href='index.html#contact';</script>";
        exit;
    }

    if (preg_match("/[\r\n]/", $email) || preg_match("/[\r\n]/", $assunto)) {
        echo "<script>alert('Dados inválidos detectados.'); window.location.href='index.html#contact';</script>";
        exit;
    }

    $para = "teteudeveloper@gmail.com";
    $headers = "From: contato@seudominio.com\r\n"; 
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    $corpo_email = "Você recebeu uma nova mensagem do site:\n\n";
    $corpo_email .= "Nome: $nome\n";
    $corpo_email .= "Email: $email\n";
    $corpo_email .= "Telefone: $telefone\n";
    $corpo_email .= "Assunto: $assunto\n";
    $corpo_email .= "Mensagem:\n$mensagem\n";

    if(mail($para, $assunto, $corpo_email, $headers)) {
        echo "<script>alert('Mensagem enviada com sucesso!'); window.location.href='index.html#contact';</script>";
    } else {
        echo "<script>alert('Erro ao enviar mensagem. Tente novamente.'); window.location.href='index.html#contact';</script>";
    }
}
?>
