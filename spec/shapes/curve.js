(function() {
  var Bit, Curve, curve, ns, svg;

  Curve = mojs.shapesMap.getShape('curve');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  curve = new Curve({
    ctx: svg
  });

  describe('Curve ->', function() {
    it('should extend Bit', function() {
      return expect(curve instanceof Bit).toBe(true);
    });
    describe('_declareDefaults method ->', function() {
      it('should call super', function() {
        spyOn(Bit.prototype, '_declareDefaults');
        curve._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      return it('should set `shape` to `path`', function() {
        return expect(curve._defaults.shape).toBe('path');
      });
    });
    describe('draw method ->', function() {
      it('should call super', function() {
        spyOn(Bit.prototype, 'draw');
        curve.draw();
        return expect(Bit.prototype.draw).toHaveBeenCalled();
      });
      it('should call `el.setAttribute` for `d` attribute ', function() {
        var p, radiusX, radiusY, x, x1, x2, x3, y, y1, y2, y3;
        radiusX = 20;
        radiusY = 30;
        curve = new Curve({
          ctx: svg
        }, radiusX, radiusY);
        curve.draw();
        p = curve._props;
        radiusX = p.radiusX != null ? p.radiusX : p.radius;
        radiusY = p.radiusY != null ? p.radiusY : p.radius;
        x = 1 * p.x;
        y = 1 * p.y;
        x1 = x - radiusX;
        x2 = x;
        x3 = x + radiusX;
        y1 = y - radiusY;
        y2 = y;
        y3 = y + radiusY;
        return expect(curve.el.getAttribute('d')).toBe("M" + x1 + " " + p.y + " Q " + x2 + " " + (p.y - 2 * radiusY) + " " + x3 + " " + p.y);
      });
      it('should save `radiusX/radiusY/points` properties', function() {
        var p, radiusX, radiusY, x, x1, x2, x3, y, y1, y2, y3;
        radiusX = 20;
        radiusY = 30;
        curve = new Curve({
          ctx: svg
        }, radiusX, radiusY);
        curve.draw();
        p = curve._props;
        radiusX = p.radiusX != null ? p.radiusX : p.radius;
        radiusY = p.radiusY != null ? p.radiusY : p.radius;
        x = 1 * p.x;
        y = 1 * p.y;
        x1 = x - radiusX;
        x2 = x;
        x3 = x + radiusX;
        y1 = y - radiusY;
        y2 = y;
        y3 = y + radiusY;
        expect(curve._prevRadiusX).toBe(radiusX);
        expect(curve._prevRadiusY).toBe(radiusY);
        return expect(curve._prevPoints).toBe(p.points);
      });
      it('should not set the `d` attribute if nothing changed', function() {
        var radiusX, radiusY;
        radiusX = 20;
        radiusY = 30;
        curve = new Curve({
          ctx: svg
        }, radiusX, radiusY);
        curve.draw();
        spyOn(curve.el, 'setAttribute');
        curve.draw();
        return expect(curve.el.setAttribute).not.toHaveBeenCalled();
      });
      it('should set `d` attribute if `radiusX` changed', function() {
        curve = new Curve({
          ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
          radius: 20,
          points: 10
        });
        curve.draw();
        spyOn(curve.el, 'setAttribute');
        curve._props.radiusX = 30;
        curve.draw();
        return expect(curve.el.setAttribute).toHaveBeenCalled();
      });
      it('should set `d` attribute if `radiusY` changed', function() {
        curve = new Curve({
          ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
          radius: 20,
          points: 10
        });
        curve.draw();
        spyOn(curve.el, 'setAttribute');
        curve._props.radiusY = 30;
        curve.draw();
        return expect(curve.el.setAttribute).toHaveBeenCalled();
      });
      return it('should set `d` attribute if `points` changed', function() {
        curve = new Curve({
          ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
          radius: 20,
          points: 10
        });
        curve.draw();
        spyOn(curve.el, 'setAttribute');
        curve._props.points = 30;
        curve.draw();
        return expect(curve.el.setAttribute).toHaveBeenCalled();
      });
    });
    return describe('getLength method', function() {
      return it('should calculate total length of the path', function() {
        var dRadius, len, p, radiusX, radiusY, sqrt;
        radiusX = 20;
        radiusY = 30;
        curve = new Curve({
          ctx: svg
        }, radiusX, radiusY);
        p = curve._props;
        radiusX = p.radiusX != null ? p.radiusX : p.radius;
        radiusY = p.radiusY != null ? p.radiusY : p.radius;
        dRadius = radiusX + radiusY;
        sqrt = Math.sqrt((3 * radiusX + radiusY) * (radiusX + 3 * radiusY));
        len = .5 * Math.PI * (3 * dRadius - sqrt);
        return expect(curve.getLength()).toBe(len);
      });
    });
  });

}).call(this);
