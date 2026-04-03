const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function seedDemoUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Demo user data
    const demoUsers = [
      {
        name: 'Demo User',
        phone: '9876543210',
        email: 'demo@paysurance.com',
        password: 'demo@123',
        delivery_platform: 'swiggy',
        weekly_income: 5000,
        wallet_balance: 1000,
        is_admin: false,
      },
      {
        name: 'Admin User',
        phone: '9876543211',
        email: 'admin@paysurance.com',
        password: 'admin@123',
        delivery_platform: 'zomato',
        weekly_income: 10000,
        wallet_balance: 5000,
        is_admin: true,
      },
    ];

    for (const userData of demoUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();
      console.log(`Created user: ${userData.email}`);
    }

    console.log('Demo users seeded successfully!');
  } catch (error) {
    console.error('Error seeding demo users:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDemoUsers();