(function() {
  var Bit, Zigzag, ns, svg;

  Zigzag = mojs.shapesMap.getShape('zigzag');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  document.body.appendChild(svg);

  describe('Zigzag ->', function() {
    it('should extend Bit', function() {
      var line;
      line = new Zigzag({
        ctx: svg
      });
      return expect(line instanceof Bit).toBe(true);
    });
    it('should add itself to context', function() {
      var line;
      line = new Zigzag({
        ctx: svg
      });
      return expect(svg.firstChild).toBeDefined();
    });
    describe('methods ->', function() {
      return describe('draw method ->', function() {
        it('should add properties to el', function() {
          var zigzag;
          return zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20
          });
        });
        it('should define points', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20
          });
          return expect(zigzag.el.getAttribute('d')).toBeTruthy();
        });
        it('should not work with 0 points', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 0
          });
          return expect(zigzag.el.getAttribute('d')).toBeFalsy();
        });
        it('should calculate path length', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag.draw();
          return expect(zigzag._length).toBeCloseTo(184.390, 2);
        });
        it('should set `d` attribute', function() {
          var currentX, currentY, delta, i, length, p, points, radiusX, radiusY, stepX, x, y, yFlip, zigzag, _i, _ref;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag.draw();
          p = zigzag._props;
          radiusX = p.radiusX != null ? p.radiusX : p.radius;
          radiusY = p.radiusY != null ? p.radiusY : p.radius;
          x = 1 * p.x;
          y = 1 * p.y;
          currentX = x - radiusX;
          currentY = y;
          stepX = (2 * radiusX) / (p.points - 1);
          yFlip = -1;
          delta = Math.sqrt(stepX * stepX + radiusY * radiusY);
          length = -delta;
          points = "M" + currentX + ", " + y + " ";
          for (i = _i = 0, _ref = p.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            points += "L" + currentX + ", " + currentY + " ";
            currentX += stepX;
            length += delta;
            currentY = yFlip === -1 ? y - radiusY : y;
            yFlip = -yFlip;
          }
          expect(zigzag.el.getAttribute('d')).toBe(points);
          expect(zigzag._prevRadiusX).toBe(radiusX);
          expect(zigzag._prevRadiusY).toBe(radiusY);
          return expect(zigzag._prevPoints).toBe(p.points);
        });
        it('should not set `d` attribute if nothing changed', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag.draw();
          spyOn(zigzag.el, 'setAttribute');
          zigzag.draw();
          return expect(zigzag.el.setAttribute).not.toHaveBeenCalled();
        });
        it('should set `d` attribute if `radiusX` changed', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag.draw();
          spyOn(zigzag.el, 'setAttribute');
          zigzag._props.radiusX = 30;
          zigzag.draw();
          return expect(zigzag.el.setAttribute).toHaveBeenCalled();
        });
        it('should set `d` attribute if `radiusY` changed', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag.draw();
          spyOn(zigzag.el, 'setAttribute');
          zigzag._props.radiusY = 30;
          zigzag.draw();
          return expect(zigzag.el.setAttribute).toHaveBeenCalled();
        });
        return it('should set `d` attribute if `points` changed', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag.draw();
          spyOn(zigzag.el, 'setAttribute');
          zigzag._props.points = 30;
          zigzag.draw();
          return expect(zigzag.el.setAttribute).toHaveBeenCalled();
        });
      });
    });
    return describe('getLength method ->', function() {
      return it('should calculate total length of the path', function() {
        var bit;
        bit = new Zigzag({
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: 100,
          radiusY: 550
        });
        bit.draw();
        return expect(bit.getLength()).toBe(bit._length);
      });
    });
  });

}).call(this);
