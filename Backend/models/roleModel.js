
import mongoose from "mongoose";

const roleSchema =  mongoose.Schema({
  role_id: {
    type: Number, 
    required: true,
    unique: true, // Set as unique identifier
  },
  role_name: {
    type: String,
    required: true,
  },
  dept_id: {
    type: Number,
    required: true,
  },
  dept_name: {
    type: String,
    required: true,
  },
  updated_by: {
    type: String,
    required: true,
  },
  inserted_by: {
    type: String,
    required: true,
  },
  is_active_flag: {
    type: Boolean,
    default: true,
  },
  inserted_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Role = mongoose.model("Role", roleSchema, 'role');

export default Role;