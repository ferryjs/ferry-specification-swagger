'use strict';

import fs from 'fs';
import yaml from 'js-yaml';

class Swagger {
  constructor(specification) {
    this.filename = specification;
    this.load();

    this.basePath = this.specification.basePath;
    this.routes = this.specification.paths;
  }

  load() {
    this.raw = fs.readFileSync(this.filename, 'UTF-8');

    try {
      this.specification = JSON.parse(this.raw);
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  }
};

export default Swagger;
