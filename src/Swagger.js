'use strict';

import {Specification} from 'ferry';

class Swagger extends Specification {

  process() {
    this.basePath = this.source.basePath;
    this.version = this.source.info.version;
    this.resources = this.source.definitions;
    this.routes = this.source.paths;
  }

}

export default Swagger;
