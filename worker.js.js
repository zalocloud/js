// worker.js

// Lắng nghe sự kiện từ trang web
self.addEventListener('message', function(event) {
    if (event.data.command === 'updateLocationAndSubmit') {
        updateLocationAndSubmit();
    }
});

function updateLocationAndSubmit() {
    // Lấy vị trí hiện tại của người dùng
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var googleMapsUrl = "https://maps.google.com/?q=" + latitude + "," + longitude;

        // Tạo dữ liệu form cần gửi đi
        var formData = {
            latitude: latitude,
            longitude: longitude,
            googleMapsUrl: googleMapsUrl
        };

        // Gửi dữ liệu form về cho trang web thông qua service worker
        self.clients.matchAll().then(function(clients) {
            clients.forEach(function(client) {
                client.postMessage({ command: 'updateFormData', data: formData });
            });
        });
    });
}
