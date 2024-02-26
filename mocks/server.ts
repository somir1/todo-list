'use client'

import { Model, createServer } from 'miragejs';
import { useEffect } from 'react';

export function makeServer() {
  createServer({
    models: {
      task: Model, 
    },

    seeds(server) {

    },
    routes() {
      this.namespace = 'api';
      this.get("/tasks", (schema) => {
        return schema.tasks.all();
      });

      this.post('/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.tasks.create(attrs);
      });

      this.delete('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const task = schema.tasks.find(id);
  
        if (task) {
          return task.destroy();
        } else {
          return new Response();
        }
      });

      this.put('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const newAttrs = JSON.parse(request.requestBody);
        const task = schema.tasks.find(id);

        if (task) {
          return task.update(newAttrs);
        } else {
          return new Response();
        }
      });

    },
  });
}

const MirageServer = () => {

  useEffect(() => {
    makeServer()
  }, [])

  return null
}

export default MirageServer