'use strict';

import fs from 'fs';
import yaml from 'js-yaml';

class Swagger {
  constructor(specification) {
    this.filename = specification;
    this.load();
    this.convert();
  }

  load() {
    this.raw = fs.readFileSync(this.filename, 'UTF-8');

    try {
      this.specification = JSON.parse(this.raw);
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  }

  convert() {
    this.basePath = this.specification.basePath;
    this.routes = this.specification.paths;
  }

};

export default Swagger;
