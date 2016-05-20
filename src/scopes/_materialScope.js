// (function(Blotter, _, THREE, Detector, requestAnimationFrame, EventEmitter, GrowingPacker, setImmediate) {

//   Blotter._MaterialScope = function (text, blotter) {
//     this.text = text;

//     this.blotter = blotter;

//     this.needsUpdate = true;
//   };

//   Blotter._MaterialScope.prototype = (function () {


//     function _getSanitizedUniformsForUniformsAndMappingMaterialUniforms (uniforms, mappingMaterialUniforms) {
//      return _.reduce(uniforms, function (memo, uniform, uniformName) {
//         var mappingUniform = mappingMaterialUniforms[uniformName],
//             typesMatch = mappingUniform.type == uniform.type,
//             isValidValue = Blotter._UniformUtils.validValueForUniformType(mappingUniform.type, uniform.value);

//         if (!typesMatch || !isValidValue) {
//           // ### - messaging
//           Blotter._Messaging.logWarning("Blotter._MaterialScope", "current scoped uniform value not valid for global uniform type: " + mappingUniform.type + ". Falling back to default uniform value")
//           uniform._type = mappingUniform.type;
//           uniform._value = mappingUniform.value;
//         }

//         memo[uniformName] = uniform;
//         return memo;
//       }, {});
//     }


//     function _getUniformInterfaceForUniformNameAndTextInMappingMaterial (uniformName, text, mappingMaterial) {
//       var uniform = mappingMaterial.uniforms[uniformName];

//       return {
//         _type : uniform.type,
//         _value : uniform.value,
//         _mappingMaterial : mappingMaterial,

//         get type () {
//           return this._type;
//         },

//         set type (v) {
//           // ### - messaging
//           Blotter._Messaging.logError("Blotter._MaterialScope", "uniform types may not be updated");
//         },

//         get value () {
//           return this._value;
//         },

//         set value (v) {
//           if (!Blotter._UniformUtils.validValueForUniformType(this._type, v)) {
//             // ### - messaging
//             Blotter._Messaging.logError("Blotter._MaterialScope", "uniform value not valid for uniform type: " + this._type);
//             return;
//           }
//           this._value = v;

//           this._mappingMaterial.setValueForUniformNameInDataTextureForText(v, uniformName, text);
//         }
//       }
//     }


//     function _update () {
//       var mappingMaterial = this.blotter.mappingMaterial;
//       if (mappingMaterial) {

//         // Default this.uniforms object if it doesn't yet exist and extract only the uniform values where the uniform name exists in the mapping material uniforms.
//         this.uniforms = this.uniforms || {};
//         this.uniforms = _.pick(this.uniforms, _.keys(mappingMaterial.uniforms));

//         var mappingMaterialUniforms = mappingMaterial.uniforms,
//             newUniformNames = _.difference(_.keys(mappingMaterialUniforms), _.keys(this.uniforms));
//             newUniforms = _.pick(mappingMaterialUniforms, newUniformNames);

//         this.uniforms = _getSanitizedUniformsForUniformsAndMappingMaterialUniforms(this.uniforms, mappingMaterial.uniforms);

//         _.each(newUniformNames, _.bind(function (uniformName) {
//           this.uniforms[uniformName] = _getUniformInterfaceForUniformNameAndTextInMappingMaterial(uniformName, this.text, mappingMaterial);
//           mappingMaterial.setValueForUniformNameInDataTextureForText(this.uniforms[uniformName].value, uniformName, this.text);
//         }, this));
//       }
//     }






// // if blotter has mappingMaterial
// //   if no uniforms, create empty one
// //   align uniforms object with mappingMaterialUniforms
//         // 1. drop key/values not in mappingMaterial uniforms
//         // 2. update current uniform values and types based on mappingMaterial uniforms
//         // 3. create new interface objects for new uniforms


//     return {

//       constructor : Blotter._MaterialScope,

//       get needsUpdate () { }, // jshint

//       set needsUpdate (value) {
//         if (value === true) {
//           _update.call(this);
//         }
//       }
//     };
//   })();

// })(
//   this.Blotter, this._, this.THREE, this.Detector, this.requestAnimationFrame, this.EventEmitter, this.GrowingPacker, this.setImmediate
// );
