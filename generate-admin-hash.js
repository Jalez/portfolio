import bcrypt from 'bcryptjs';

// Generate a secure admin password hash
async function generateAdminPasswordHash() {
  const defaultPassword = 'AdminPass2025!'; // Change this to your desired password
  const saltRounds = 12;
  
  try {
    const hash = await bcrypt.hash(defaultPassword, saltRounds);
    console.log('Admin Password Hash:');
    console.log(hash);
    console.log('\nUpdate your database with this SQL command:');
    console.log(`UPDATE users SET password_hash = '${hash}' WHERE email = 'jaakko.rajala@tuni.fi';`);
    console.log('\nDefault password:', defaultPassword);
    console.log('⚠️  IMPORTANT: Change this password immediately after first login!');
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateAdminPasswordHash();