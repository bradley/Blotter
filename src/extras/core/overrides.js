(function(Blotter, _) {

  Blotter._extendWithGettersSetters = function (obj) {
    _.each(Array.prototype.slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] && Object.getOwnPropertyDescriptor(obj, prop) && Object.getOwnPropertyDescriptor(obj, prop).set) {
            Object.getOwnPropertyDescriptor(obj, prop).set(source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  };

})(
  this.Blotter, this._
);
