import mongoose  from 'mongoose';
import bcrypt  from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email address'],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false
  }


},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

userSchema.virtual('todos', {
  ref: 'Todo',
  foreignField: 'user',
  localField: '_id'
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});



userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};




const User = mongoose.model('User', userSchema);

export default User;
