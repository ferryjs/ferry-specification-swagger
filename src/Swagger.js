'use strict';

import parser from 'swagger-parser';

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
  }

}

export default Swagger;
