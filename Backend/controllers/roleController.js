import Role from '../models/roleModel.js';

// Controller function to get all roles
async function getAllRoles (req, res) {
    Role.find()
      .then((role) => res.json(role))
      .catch((err) => res.status(500).json({ error: "Error fetching roles from the database." }));
  };

// Create and Save a new Role
async function createRole(req, res) {
    try {
        console.log("Incoming request body:", req.body);
    
        const newRoleData = req.body;
        const newRole = new Role(newRoleData);
        const savedRole = await newRole.save();
        res.status(201).json(savedRole);
      } catch (err) {
        console.error("Error creating role:", err);
        res.status(500).json({ error: "Failed to create role. Please check the data and try again." });
      }
  };

  // Get Role by Id
  async function getRoleById(req, res) {
    const { role_id } = req.params;
  
    try {
      const role = await Role.findOne({ role_id });
      if (!role) {
        res.status(404).json({ error: "Role not found." });
      } else {
        res.status(200).json(role);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch role." });
    }
  };

  // Update Role by Id
  async function updateRole(req, res) {
    const { role_id } = req.params;
  
    try {
      const updatedRoleData = req.body; // Assuming the request body contains the updated role data
      const updatedRole = await Role.findOneAndUpdate({ role_id }, updatedRoleData, {
        new: true, // To return the updated role
      });
      if (!updatedRole) {
        res.status(404).json({ error: "Role not found." });
      } else {
        res.status(200).json(updatedRole);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to update role." });
    }
  };

  // Delete Role by Id
  async function deleteRole(req, res) {
    const { role_id } = req.params;
  
    try {
      const deletedRole = await Role.findOneAndDelete({ role_id });
      if (!deletedRole) {
        res.status(404).json({ error: "Role not found." });
      } else {
        res.status(200).json(deletedRole);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to delete role." });
    }
  };

 export {   
    getAllRoles,
    createRole,
    getRoleById,
    updateRole,
    deleteRole
  };