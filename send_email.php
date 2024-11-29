<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Formulardaten auslesen
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // Zieladresse
    $to = "janamara.garo@gmail.com";

    // Betreff der E-Mail
    $subject = "Neue Kontaktanfrage von $name";

    // Nachricht
    $body = "Sie haben eine neue Kontaktanfrage erhalten.\n\n";
    $body .= "Name: $name\n";
    $body .= "E-Mail: $email\n";
    $body .= "Telefonnummer: $phone\n";
    $body .= "Nachricht:\n$message\n";

    // Header für die E-Mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // E-Mail senden
    if (mail($to, $subject, $body, $headers)) {
        echo "Vielen Dank, Ihre Nachricht wurde erfolgreich gesendet!";
    } else {
        echo "Entschuldigung, Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.";
    }
}
?>
