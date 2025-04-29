import { createServer } from 'miragejs';

export function makeServer() {
  createServer({
    routes() {
      this.namespace = 'api';

      this.get('/products', () => {
        const products = [
          // Electronics (20)
          { id: '1', name: 'Smartphone', category: 'Electronics', price: 699, quantity: 50 },
          { id: '2', name: 'Laptop', category: 'Electronics', price: 1299, quantity: 30 },
          { id: '3', name: 'Wireless Headphones', category: 'Electronics', price: 199, quantity: 80 },
          { id: '4', name: 'Smartwatch', category: 'Electronics', price: 299, quantity: 60 },
          { id: '5', name: 'Bluetooth Speaker', category: 'Electronics', price: 149, quantity: 90 },
          { id: '6', name: 'Tablet', category: 'Electronics', price: 499, quantity: 40 },
          { id: '7', name: 'Gaming Console', category: 'Electronics', price: 399, quantity: 35 },
          { id: '8', name: 'Monitor', category: 'Electronics', price: 250, quantity: 45 },
          { id: '9', name: 'Keyboard', category: 'Electronics', price: 99, quantity: 120 },
          { id: '10', name: 'Mouse', category: 'Electronics', price: 59, quantity: 140 },
          { id: '11', name: 'Router', category: 'Electronics', price: 120, quantity: 60 },
          { id: '12', name: 'Webcam', category: 'Electronics', price: 80, quantity: 70 },
          { id: '13', name: 'Drone', category: 'Electronics', price: 799, quantity: 20 },
          { id: '14', name: 'Smart TV', category: 'Electronics', price: 999, quantity: 25 },
          { id: '15', name: 'Projector', category: 'Electronics', price: 650, quantity: 15 },
          { id: '16', name: 'Power Bank', category: 'Electronics', price: 49, quantity: 100 },
          { id: '17', name: 'Fitness Tracker', category: 'Electronics', price: 199, quantity: 70 },
          { id: '18', name: 'USB Hub', category: 'Electronics', price: 30, quantity: 110 },
          { id: '19', name: 'VR Headset', category: 'Electronics', price: 499, quantity: 18 },
          { id: '20', name: 'E-Reader', category: 'Electronics', price: 150, quantity: 40 },

          // Clothing (20)
          { id: '21', name: 'Denim Jacket', category: 'Clothing', price: 120, quantity: 30 },
          { id: '22', name: 'Cotton T-shirt', category: 'Clothing', price: 25, quantity: 150 },
          { id: '23', name: 'Sweatpants', category: 'Clothing', price: 45, quantity: 100 },
          { id: '24', name: 'Sneakers', category: 'Clothing', price: 150, quantity: 70 },
          { id: '25', name: 'Wool Sweater', category: 'Clothing', price: 90, quantity: 80 },
          { id: '26', name: 'Formal Shirt', category: 'Clothing', price: 60, quantity: 90 },
          { id: '27', name: 'Jeans', category: 'Clothing', price: 80, quantity: 60 },
          { id: '28', name: 'Raincoat', category: 'Clothing', price: 100, quantity: 20 },
          { id: '29', name: 'Sports Shorts', category: 'Clothing', price: 35, quantity: 140 },
          { id: '30', name: 'Leather Boots', category: 'Clothing', price: 200, quantity: 30 },
          { id: '31', name: 'Windbreaker', category: 'Clothing', price: 85, quantity: 50 },
          { id: '32', name: 'Hoodie', category: 'Clothing', price: 70, quantity: 120 },
          { id: '33', name: 'Cap', category: 'Clothing', price: 20, quantity: 200 },
          { id: '34', name: 'Tracksuit', category: 'Clothing', price: 150, quantity: 50 },
          { id: '35', name: 'Blazer', category: 'Clothing', price: 180, quantity: 40 },
          { id: '36', name: 'Chinos', category: 'Clothing', price: 65, quantity: 60 },
          { id: '37', name: 'Swimwear', category: 'Clothing', price: 40, quantity: 100 },
          { id: '38', name: 'Dress', category: 'Clothing', price: 90, quantity: 70 },
          { id: '39', name: 'Socks', category: 'Clothing', price: 10, quantity: 250 },
          { id: '40', name: 'Graphic Tee', category: 'Clothing', price: 30, quantity: 150 },

          // Accessories (20)
          { id: '41', name: 'Sunglasses', category: 'Accessories', price: 60, quantity: 80 },
          { id: '42', name: 'Leather Wallet', category: 'Accessories', price: 70, quantity: 70 },
          { id: '43', name: 'Wristwatch', category: 'Accessories', price: 250, quantity: 40 },
          { id: '44', name: 'Backpack', category: 'Accessories', price: 90, quantity: 50 },
          { id: '45', name: 'Belt', category: 'Accessories', price: 40, quantity: 70 },
          { id: '46', name: 'Scarf', category: 'Accessories', price: 25, quantity: 80 },
          { id: '47', name: 'Gloves', category: 'Accessories', price: 30, quantity: 90 },
          { id: '48', name: 'Earrings', category: 'Accessories', price: 50, quantity: 60 },
          { id: '49', name: 'Necklace', category: 'Accessories', price: 100, quantity: 40 },
          { id: '50', name: 'Bracelet', category: 'Accessories', price: 45, quantity: 60 },
          { id: '51', name: 'Hat', category: 'Accessories', price: 25, quantity: 100 },
          { id: '52', name: 'Keychain', category: 'Accessories', price: 10, quantity: 200 },
          { id: '53', name: 'Tie', category: 'Accessories', price: 20, quantity: 90 },
          { id: '54', name: 'Umbrella', category: 'Accessories', price: 35, quantity: 80 },
          { id: '55', name: 'Phone Case', category: 'Accessories', price: 20, quantity: 120 },
          { id: '56', name: 'Laptop Sleeve', category: 'Accessories', price: 45, quantity: 80 },
          { id: '57', name: 'Duffel Bag', category: 'Accessories', price: 100, quantity: 40 },
          { id: '58', name: 'Travel Pillow', category: 'Accessories', price: 30, quantity: 70 },
          { id: '59', name: 'Shoe Bag', category: 'Accessories', price: 25, quantity: 80 },
          { id: '60', name: 'Cosmetic Pouch', category: 'Accessories', price: 35, quantity: 90 },

          // Home (20)
          { id: '61', name: 'Blender', category: 'Home', price: 150, quantity: 30 },
          { id: '62', name: 'Vacuum Cleaner', category: 'Home', price: 300, quantity: 25 },
          { id: '63', name: 'Air Purifier', category: 'Home', price: 400, quantity: 20 },
          { id: '64', name: 'Coffee Maker', category: 'Home', price: 120, quantity: 35 },
          { id: '65', name: 'Table Lamp', category: 'Home', price: 60, quantity: 50 },
          { id: '66', name: 'Rice Cooker', category: 'Home', price: 100, quantity: 30 },
          { id: '67', name: 'Electric Kettle', category: 'Home', price: 80, quantity: 40 },
          { id: '68', name: 'Toaster', category: 'Home', price: 70, quantity: 45 },
          { id: '69', name: 'Microwave Oven', category: 'Home', price: 250, quantity: 20 },
          { id: '70', name: 'Curtains', category: 'Home', price: 90, quantity: 60 },
          { id: '71', name: 'Mattress', category: 'Home', price: 600, quantity: 10 },
          { id: '72', name: 'Bookshelf', category: 'Home', price: 250, quantity: 20 },
          { id: '73', name: 'Study Desk', category: 'Home', price: 300, quantity: 15 },
          { id: '74', name: 'Chair', category: 'Home', price: 150, quantity: 25 },
          { id: '75', name: 'Ceiling Fan', category: 'Home', price: 200, quantity: 30 },
          { id: '76', name: 'Sofa Cover', category: 'Home', price: 120, quantity: 40 },
          { id: '77', name: 'Wall Clock', category: 'Home', price: 50, quantity: 70 },
          { id: '78', name: 'Water Filter', category: 'Home', price: 220, quantity: 25 },
          { id: '79', name: 'Laundry Basket', category: 'Home', price: 40, quantity: 80 },
          { id: '80', name: 'Floor Mop', category: 'Home', price: 35, quantity: 90 },

          // Books (20)
          { id: '81', name: 'Science Fiction Novel', category: 'Books', price: 20, quantity: 100 },
          { id: '82', name: 'Cookbook', category: 'Books', price: 25, quantity: 90 },
          { id: '83', name: 'Mystery Thriller', category: 'Books', price: 22, quantity: 100 },
          { id: '84', name: 'Business Guide', category: 'Books', price: 30, quantity: 80 },
          { id: '85', name: 'History Textbook', category: 'Books', price: 35, quantity: 60 },
          { id: '86', name: 'Romance Novel', category: 'Books', price: 18, quantity: 100 },
          { id: '87', name: 'Fantasy Adventure', category: 'Books', price: 24, quantity: 80 },
          { id: '88', name: 'Programming Manual', category: 'Books', price: 50, quantity: 40 },
          { id: '89', name: 'Self-Help Book', category: 'Books', price: 22, quantity: 90 },
          { id: '90', name: 'Photography Guide', category: 'Books', price: 30, quantity: 70 },
          { id: '91', name: 'Biography', category: 'Books', price: 28, quantity: 80 },
          { id: '92', name: 'Poetry Collection', category: 'Books', price: 18, quantity: 90 },
          { id: '93', name: 'Children’s Storybook', category: 'Books', price: 20, quantity: 100 },
          { id: '94', name: 'Travel Diary', category: 'Books', price: 25, quantity: 60 },
          { id: '95', name: 'Art History Book', category: 'Books', price: 32, quantity: 50 },
          { id: '96', name: 'Language Learning Book', category: 'Books', price: 35, quantity: 70 },
          { id: '97', name: 'Gardening Guide', category: 'Books', price: 28, quantity: 90 },
          { id: '98', name: 'Nutrition Handbook', category: 'Books', price: 25, quantity: 80 },
          { id: '99', name: 'Health Tips Book', category: 'Books', price: 20, quantity: 70 },
          { id: '100', name: 'DIY Manual', category: 'Books', price: 30, quantity: 60 },
        ];

        return products;
      });

      this.get('/sales', () => {
        return [
          { id: '1', productId: '1', quantity: 2, totalPrice: 1398, date: '2024-04-20T10:00:00Z' },
          { id: '2', productId: '2', quantity: 1, totalPrice: 1299, date: '2024-04-21T12:30:00Z' },
          { id: '3', productId: '4', quantity: 3, totalPrice: 897, date: '2024-04-22T14:45:00Z' },
          { id: '4', productId: '21', quantity: 4, totalPrice: 480, date: '2024-04-23T16:10:00Z' },
          { id: '5', productId: '44', quantity: 2, totalPrice: 180, date: '2024-04-23T17:50:00Z' },
          { id: '6', productId: '81', quantity: 5, totalPrice: 100, date: '2024-04-24T09:30:00Z' },
          { id: '7', productId: '15', quantity: 1, totalPrice: 650, date: '2024-04-24T11:15:00Z' },
          { id: '8', productId: '61', quantity: 2, totalPrice: 300, date: '2024-04-24T14:05:00Z' },
          { id: '9', productId: '36', quantity: 3, totalPrice: 195, date: '2024-04-25T10:20:00Z' },
          { id: '10', productId: '92', quantity: 6, totalPrice: 108, date: '2024-04-25T13:40:00Z' },
          // ➡️ Add more sample sales if needed
        ];
      });
      
    }

  });

  
}
