$(document).ready(function () {
    google.maps.event.addDomListener(window, "load", function () {
        var e, a, t = [
                ["<p class='mapheader'>Deep Kamal Shopping Center</p><p class='mapcontent'> Varachha Main Rd, Sarthana Jakat Naka, Nature Park and Zoo,<br> Nana Varachha, Surat, Gujarat 395008</p>", 21.2292416, 72.8966984, 0]
        ],
            s = new google.maps.Map(document.getElementById("factorymap"), {
                zoom: 8,
                center: new google.maps.LatLng(21.148485, 72.765476),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }),
            n = new google.maps.InfoWindow({});
        for (a = 0; a < t.length; a++) e = new google.maps.Marker({
            position: new google.maps.LatLng(t[a][1], t[a][2]),
            map: s
        }), google.maps.event.addListener(e, "click", function (e, a) {
            return function () {
                n.setContent(t[a][0]), n.open(s, e)
            }
        }(e, a))
    });
});
