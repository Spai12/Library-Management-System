const User = require('../models/user');


// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('borrowingHistory');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Add new user
exports.addUser = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body;
    // const hashedpass=await bcrypt.hash(password,10)
    // console.log(hashedpass)
    const newUser = new User({ name, email, password });
    console.log(newUser)
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    // const hashedpass=await bcrypt.hash(password,10)
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
