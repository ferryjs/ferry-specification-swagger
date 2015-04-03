'use strict';

import parser from 'swagger-parser';
import validator from 'tv4';

import {Specification} from 'ferry';

class Swagger extends Specification {

  initialize(callback) {

    try {

      parser.parse(this.filepath, (err, api, metadata) => {

        this.source = api;

        this.process();

        if (typeof callback === 'function') {
          callback(err);
        }

      });

    } catch (err) {
      throw new Error('Specification source is not valid Swagger');
    }

  }

  process() {
    this.basePath = this.source.basePath;
    this.version = this.source.info.version;
    this.resources = this.source.definitions;
    this.routes = this.source.paths;
    this.compileValidators();
  }

  compileValidators() {
    this.validators = {};
    for (let path in this.routes) {
      for (let method in this.routes[path]) {
        if (this.routes[path][method].parameters && this.routes[path][method].parameters.length) {
          this.routes[path][method].parameters.forEach((route) => {
            if (route.in === 'body') {
              // Key custom validators by operation.
              this.validators[this.routes[path][method].operationId] = route.schema;
            }
          });
        }
      }
    }
  }

  getResourceSpecForValidator(resourceType, operation) {
    return this.validators[operation];
  }

  validateResource(resourceType, resource, operation, callback) {
    let result = validator.validateMultiple(resource, this.getResourceSpecForValidator(resourceType, operation), true, true);
    let res = result.valid ? true : result;
    return (typeof callback === 'function') ? callback(res) : res;
  }

}

export default Swagger;
