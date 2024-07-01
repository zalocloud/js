$(".wrfl-is-mobile i").text(WURFL.is_mobile);
$(".wrfl-form-factor i").text(WURFL.form_factor);
$(".wrfl-device-name i").text(WURFL.complete_device_name);


// NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
var RTCPeerConnection = /*window.RTCPeerConnection ||*/window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

if (RTCPeerConnection) (function () {
  var rtc = new RTCPeerConnection({ iceServers: [] });
  if (1 || window.mozRTCPeerConnection) {// FF [and now Chrome!] needs a channel/stream to proceed
    rtc.createDataChannel('', { reliable: false });
  };

  rtc.onicecandidate = function (evt) {
    // convert the candidate to SDP so we can run it through our general parser
    // see https://twitter.com/lancestout/status/525796175425720320 for details
    if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
  };
  rtc.createOffer(function (offerDesc) {
    grepSDP(offerDesc.sdp);
    rtc.setLocalDescription(offerDesc);
  }, function (e) {console.warn("offer failed", e);});


  var addrs = Object.create(null);
  addrs["0.0.0.0"] = false;
  function updateDisplay(newAddr) {
    if (newAddr in addrs) return;else
    addrs[newAddr] = true;
    var displayAddrs = Object.keys(addrs).filter(function (k) {return addrs[k];});
    document.getElementById('list').textContent = displayAddrs.join(" or perhaps ") || "n/a";
  }

  function grepSDP(sdp) {
    var hosts = [];
    sdp.split('\r\n').forEach(function (line) {// c.f. http://tools.ietf.org/html/rfc4566#page-39
      if (~line.indexOf("a=candidate")) {// http://tools.ietf.org/html/rfc4566#section-5.13
        var parts = line.split(' '), // http://tools.ietf.org/html/rfc5245#section-15.1
        addr = parts[4],
        type = parts[7];
        if (type === 'host') updateDisplay(addr);
      } else if (~line.indexOf("c=")) {// http://tools.ietf.org/html/rfc4566#section-5.7
        var parts = line.split(' '),
        addr = parts[2];
        updateDisplay(addr);
      }
    });
  }
})();else {
  document.getElementById('list').innerHTML = "<code>ifconfig | grep inet | grep -v inet6 | cut -d\" \" -f2 | tail -n1</code>";
  document.getElementById('list').nextSibling.textContent = "In Chrome and Firefox your IP should display automatically, by the power of WebRTCskull.";
}




// Xác định hệ điều hành
var OSName = "Unknown OS";
if (navigator.platform.indexOf("Win") !== -1) {
    OSName = "Windows";
}
if (navigator.platform.indexOf("Mac") !== -1) {
    OSName = "MacOS";
}
if (navigator.platform.indexOf("Linux") !== -1) {
    OSName = "Linux";
}

// Cập nhật giao diện với hệ điều hành đã xác định
document.getElementById('list2').textContent += OSName;

// Xác định trình duyệt và phiên bản
var browserInfo = navigator.userAgent;
var browser = "Unknown Browser";
if (browserInfo.indexOf("Chrome") !== -1) {
    browser = "Google Chrome";
} else if (browserInfo.indexOf("Firefox") !== -1) {
    browser = "Mozilla Firefox";
} else if (browserInfo.indexOf("Safari") !== -1) {
    browser = "Safari";
} else if (browserInfo.indexOf("MSIE") !== -1 || browserInfo.indexOf("Trident/") !== -1) {
    browser = "Internet Explorer";
}

// Cập nhật giao diện với thông tin trình duyệt
document.getElementById('list3').textContent += browser;

// Xác định địa điểm đã loại bỏ

        
// Cập nhật thông tin kích thước màn hình
function updateScreenSize() {
    var screenSize = "Width: " + window.screen.width + "px, Height: " + window.screen.height + "px";
    document.getElementById('list5').textContent = "Screen Size: " + screenSize;
}

// Gọi hàm cập nhật thông tin kích thước màn hình
updateScreenSize(); 