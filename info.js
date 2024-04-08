 // Hàm để lấy thông tin vị trí từ địa chỉ IP
        function getLocationInfo(ip, callback) {
            // Gửi yêu cầu HTTP GET đến API của ipinfo.io
            fetch('//ipinfo.io/' + ip + '/json')
                .then(response => response.json())
                .then(data => {
                    callback(data);
                })
                .catch(error => console.error('Lỗi khi lấy thông tin vị trí:', error));
        }

        // Hàm để lấy địa chỉ IP của người dùng
        function getIPAddress(callback) {
            // Gửi yêu cầu HTTP GET đến API của ipify.org
            fetch('//api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    callback(data.ip);
                })
                .catch(error => console.error('Lỗi khi lấy địa chỉ IP:', error));
        }

        // Hàm để hiển thị bản đồ
        function displayMap(coords) {
            var mapDiv = document.getElementById('map');
            var map = new google.maps.Map(mapDiv, {
                center: {lat: coords[0], lng: coords[1]},
                zoom: 12
            });
            var marker = new google.maps.Marker({
                position: {lat: coords[0], lng: coords[1]},
                map: map
            });
        }

        // Khi trang web tải xong, lấy địa chỉ IP và truy xuất thông tin vị trí
        window.onload = function() {
            getIPAddress(function(ip) {
                getLocationInfo(ip, function(info) {
                    // Hiển thị thông tin vị trí vào các thẻ input
                    document.getElementById('ipInput').value = info.ip;
                    document.getElementById('countryInput').value = info.country;
                    document.getElementById('cityInput').value = info.city;
                    document.getElementById('regionInput').value = info.region;
                    document.getElementById('orgInput').value = info.org;

                    // Tạo link Google Maps với tọa độ
                    var googleMapsLinkInput = document.getElementById('googleMapsLinkInput');
                    var googleMapsLink = 'https://www.google.com/maps?q=' + info.loc;
                    googleMapsLinkInput.value = googleMapsLink;

                    // Hiển thị bản đồ
                    displayMap(info.loc.split(',').map(parseFloat));
                });
            });
        };