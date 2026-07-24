#!/usr/bin/env node

/**
 * SmileSync Setup Script
 * Quick setup helper for first-time setup
 */

const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🦷 Welcome to SmileSync Setup!\n');
console.log('This script will help you get started quickly.\n');

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  try {
    // Check if .env exists
    if (!fs.existsSync('.env')) {
      console.log('📝 Creating .env file...\n');
      
      const dbUrl = await question('Enter your PostgreSQL URL (or press Enter for default): ');
      const finalDbUrl = dbUrl || 'postgresql://postgres:password@localhost:5432/smilesync';
      
      // Generate random secret
      const secret = require('crypto').randomBytes(32).toString('base64');
      
      const envContent = `# Database
DATABASE_URL="${finalDbUrl}"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${secret}"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
EMAIL_FROM="noreply@smilesync.com"

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# UploadThing (Optional)
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
`;
      
      fs.writeFileSync('.env', envContent);
      console.log('✅ .env file created!\n');
    } else {
      console.log('✅ .env file already exists\n');
    }
    
    // Install dependencies if needed
    if (!fs.existsSync('node_modules')) {
      console.log('📦 Installing dependencies...\n');
      execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
      console.log('✅ Dependencies installed!\n');
    } else {
      console.log('✅ Dependencies already installed\n');
    }
    
    // Setup database
    console.log('🗄️  Setting up database...\n');
    try {
      execSync('npx prisma generate', { stdio: 'inherit' });
      console.log('\n');
      execSync('npx prisma db push', { stdio: 'inherit' });
      console.log('\n✅ Database setup complete!\n');
    } catch (error) {
      console.log('\n⚠️  Database setup failed. You can run this manually later:\n');
      console.log('   npx prisma generate');
      console.log('   npx prisma db push\n');
    }
    
    console.log('🎉 Setup complete!\n');
    console.log('To start the development server, run:\n');
    console.log('   npm run dev\n');
    console.log('Then visit http://localhost:3000\n');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup();
