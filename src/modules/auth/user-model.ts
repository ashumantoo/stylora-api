import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 30
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 30
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE']
  },
  birthDate: {
    type: Date
  },
  address: {
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    postalCode: {
      type: String,
      min: 6,
      max: 6
    }
  },
  mobile: {
    type: String,
    min: 10,
    max: 10
  },
  profilePicture: {
    type: String
  },
  hash_password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: "USER"
  }
}, { timestamps: true });

// userSchema.virtual("password")
//   .set(function (password) {
//     this.hash_password = bcrypt.hashSync(password, 10);
//   });

userSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

// userSchema.methods = {
//   authenticate: async (password: string) => {
//     return await bcrypt.compare(password, this.hash_password)
//   }
// }


export default mongoose.model("User", userSchema);