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
      this.source = JSON.parse(this.raw);
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  }

  convert() {
    this.basePath = this.source.basePath;
    this.routes = this.source.paths;
    this.resources = this.source.definitions;
  }

};

export default Swagger;
