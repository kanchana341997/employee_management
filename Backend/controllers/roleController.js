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

  // // Update Role by Id
  // async function updateRole(req, res) {
  //   const { role_id } = req.params;
  
  //   try {
  //     const updatedRoleData = req.body; // Assuming the request body contains the updated role data
  //     const updatedRole = await Role.findOneAndUpdate({ role_id }, updatedRoleData, {
  //       new: true, // To return the updated role
  //     });
  //     if (!updatedRole) {
  //       res.status(404).json({ error: "Role not found." });
  //     } else {
  //       res.status(200).json(updatedRole);
  //     }
  //   } catch (err) {
  //     res.status(500).json({ error: "Failed to update role." });
  //   }
  // };

  // Update Role by Id
async function updateRole(req, res) {
  const { role_id } = req.params;

  try {
    const updatedRoleData = req.body; // Assuming the request body contains the updated role data

    // Check if the role_id already exists
    const existingRole = await Role.findOne({ role_id });

    if (existingRole) {
      // Update the role if it already exists
      const updatedRole = await Role.findOneAndUpdate({ role_id }, updatedRoleData, {
        new: true, // To return the updated role
      });

      res.status(200).json(updatedRole);
    } else {
      // Create a new role using PUT method if role_id doesn't exist
      const newRoleData = { ...updatedRoleData, role_id };
      const newRole = await Role.create(newRoleData);

      res.status(201).json(newRole);
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

  // Controller to handle the PATCH request
const updateRolebyname = async (req, res) => {
  const { role_id } = req.params;
  const { role_name, dept_name } = req.body;

  try {
    // Find the role by role_id
    const role = await Role.findOne({ role_id });

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Update the role_name and dept_name if provided in the request body
    if (role_name) {
      role.role_name = role_name;
    }

    if (dept_name) {
      role.dept_name = dept_name;
    }

    // Save the updated role
    await role.save();

    return res.json({ message: 'Role updated successfully', data: role });
  } catch (error) {
    console.error('Error while updating role:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

 export {   
    getAllRoles,
    createRole,
    getRoleById,
    updateRole,
    deleteRole,
    updateRolebyname
  };