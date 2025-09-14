document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('process.php', { // Путь относительно contact.html
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сервера: ' + response.status + ' - ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        alert(data);
    })
    .catch(error => {
        alert('Произошла ошибка: ' + error.message);
    });
});