<?php
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Метод не разрешен. Ожидается POST, получен: " . ($_SERVER['REQUEST_METHOD'] ?? 'Неизвестный метод');
    exit;
}

$name = htmlspecialchars($_POST['name'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    echo "Ошибка: Все поля формы должны быть заполнены.";
    exit;
}

// Логирование для отладки
$log = "Time: " . date('Y-m-d H:i:s') . " (IST)\nMethod: " . $_SERVER['REQUEST_METHOD'] . "\nName: $name\nEmail: $email\nMessage: $message\n";
file_put_contents('logs.txt', $log, FILE_APPEND);

echo "Данные получены: Имя: $name, Email: $email, Сообщение: $message";
?>