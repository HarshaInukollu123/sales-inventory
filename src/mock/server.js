import { createServer, Model, Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      product: Model,
      sale: Model,
    },

    factories: {
      product: Factory.extend({
        name() {
          return faker.commerce.productName();
        },
        category() {
          return faker.helpers.arrayElement([
            'Electronics',
            'Clothing',
            'Accessories',
            'Home',
            'Books',
          ]);
        },
        price() {
          return parseFloat(faker.commerce.price({ min: 5, max: 500 }));
        },
        quantity() {
          return faker.number.int({ min: 0, max: 100 });
        },
      }),

      sale: Factory.extend({
        productId() {
          return faker.number.int({ min: 1, max: 1000 });
        },
        quantity() {
          return faker.number.int({ min: 1, max: 10 });
        },
        totalPrice() {
          return faker.number.int({ min: 10, max: 1000 });
        },
        date() {
          return faker.date.recent({ days: 90 }).toISOString();
        },
      }),
    },

    seeds(server) {
      server.createList('product', 1000);

      const sales = [];
      for (let i = 0; i < 10000; i++) {
        const productId = faker.number.int({ min: 1, max: 1000 });
        const quantity = faker.number.int({ min: 1, max: 10 });
        const price = faker.number.int({ min: 5, max: 500 });
        sales.push({
          productId,
          quantity,
          totalPrice: quantity * price,
          date: faker.date.recent({ days: 90 }).toISOString(),
        });
      }

      sales.forEach((sale) => server.create('sale', sale));
    },

    routes() {
      this.namespace = 'api';

      this.get('/products', (schema) => {
        return schema.products.all();
      });

      this.get('/sales', (schema) => {
        return schema.sales.all();
      });

      this.post('/products', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.products.create(attrs);
      });

      this.put('/products/:id', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        return schema.products.find(id).update(attrs);
      });

      this.del('/products/:id', (schema, request) => {
        let id = request.params.id;
        return schema.products.find(id).destroy();
      });

      this.post('/sales', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.sales.create(attrs);
      });
    },
  });
}
