import { createServer } from 'miragejs';

export function makeServer() {
  createServer({
    routes() {
      this.namespace = 'api';

      this.get('/products', () => {
        const productList = [
          // Electronics (20)
          'Smartphone', 'Laptop', 'Wireless Headphones', 'Smartwatch', 'Bluetooth Speaker',
          'Tablet', 'Gaming Console', 'Monitor', 'Keyboard', 'Mouse',
          'Router', 'Webcam', 'Drone', 'Smart TV', 'Projector',
          'Power Bank', 'Fitness Tracker', 'USB Hub', 'VR Headset', 'E-Reader',

          // Clothing (20)
          'Denim Jacket', 'Cotton T-shirt', 'Sweatpants', 'Sneakers', 'Wool Sweater',
          'Formal Shirt', 'Jeans', 'Raincoat', 'Sports Shorts', 'Leather Boots',
          'Windbreaker', 'Hoodie', 'Cap', 'Tracksuit', 'Blazer',
          'Chinos', 'Swimwear', 'Dress', 'Socks', 'Graphic Tee',

          // Accessories (20)
          'Sunglasses', 'Leather Wallet', 'Wristwatch', 'Backpack', 'Belt',
          'Scarf', 'Gloves', 'Earrings', 'Necklace', 'Bracelet',
          'Hat', 'Keychain', 'Tie', 'Umbrella', 'Phone Case',
          'Laptop Sleeve', 'Duffel Bag', 'Travel Pillow', 'Shoe Bag', 'Cosmetic Pouch',

          // Home (20)
          'Blender', 'Vacuum Cleaner', 'Air Purifier', 'Coffee Maker', 'Table Lamp',
          'Rice Cooker', 'Electric Kettle', 'Toaster', 'Microwave Oven', 'Curtains',
          'Mattress', 'Bookshelf', 'Study Desk', 'Chair', 'Ceiling Fan',
          'Sofa Cover', 'Wall Clock', 'Water Filter', 'Laundry Basket', 'Floor Mop',

          // Books (20)
          'Science Fiction Novel', 'Cookbook', 'Mystery Thriller', 'Business Guide', 'History Textbook',
          'Romance Novel', 'Fantasy Adventure', 'Programming Manual', 'Self-Help Book', 'Photography Guide',
          'Biography', 'Poetry Collection', 'Children’s Storybook', 'Travel Diary', 'Art History Book',
          'Language Learning Book', 'Gardening Guide', 'Nutrition Handbook', 'Health Tips Book', 'DIY Manual'
        ];

        const categories = {
          0: 'Electronics',
          1: 'Clothing',
          2: 'Accessories',
          3: 'Home',
          4: 'Books'
        };

        const products = productList.map((name, index) => {
          const category = categories[Math.floor(index / 20)];
          return {
            id: String(index + 1),
            name,
            category,
            price: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
            quantity: Math.floor(Math.random() * 100) + 1,
          };
        });

        return products;
      });
    }
  });
}
