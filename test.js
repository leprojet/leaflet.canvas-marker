/* https://raw.githubusercontent.com/sashakavun/leaflet-canvasicon/master/leaflet-canvasicon.js */

(function () {
  'use strict';

  var map = L.map('map', {
      zoom: 12,
      center: [37.7630, -122.4435]
  });

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(
      L.latLng([37.7930, -122.4035]),
      {
          icon: L.canvasIcon({
              iconSize: [50, 50],
              iconAnchor: [25, 25],
              fillStyle: 'rgba(255,0,0,.5)',
              drawIcon: function (icon, type) {
                  if (type == 'icon') {
                      var ctx = icon.getContext('2d');
                      var size = L.point(this.options.iconSize);
                      var center = L.point(Math.floor(size.x / 2), Math.floor(size.y / 2));
                      ctx.beginPath();
                      ctx.arc(center.x, center.y, Math.min(center.x, center.y), 0, 2 * Math.PI);
                      ctx.fillStyle = this.options.fillStyle;
                      ctx.fill();
                      ctx.closePath();
                  }
              }
          })
      }
  ).bindPopup('I have a popup!').addTo(map).openPopup();

  L.SquareIcon = L.CanvasIcon.extend({
      options: {
          iconSize: [70, 70],
          iconAnchor: [35, 35]
      },
      _setIconStyles: function (icon, type) {
          if (type == 'icon') {
              var ctx = icon.getContext('2d');
              var size = L.point(this.options.iconSize);
              var center = L.point(Math.floor(size.x / 2), Math.floor(size.y / 2));
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(size.x, 0);
              ctx.lineTo(center.x, center.y);
              ctx.lineTo(size.x, size.y);
              ctx.lineTo(0, size.y);
              ctx.lineTo(center.x, center.y);
              ctx.lineTo(0, 0);
              ctx.fillStyle = 'rgba(0,255,0,.5)';
              ctx.fill();
              ctx.closePath();
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(0, size.y);
              ctx.lineTo(center.x, center.y);
              ctx.lineTo(size.x, size.y);
              ctx.lineTo(size.x, 0);
              ctx.lineTo(center.x, center.y);
              ctx.lineTo(0, 0);
              ctx.fillStyle = 'yellow';
              ctx.fill();
              ctx.closePath();
          }
          L.CanvasIcon.prototype._setIconStyles.apply(this, arguments);
      }
  });

  L.marker(L.latLng([37.683, -122.4536]))
      .setIcon(new L.SquareIcon())
      .bindPopup('I have nice popup too!')
      .addTo(map);

})();