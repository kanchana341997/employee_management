import express from "express";
import { createRole, getAllRoles, getRoleById, updateRole, deleteRole} from "../controllers/roleController.js";

const router = express.Router();
  
    // Create a new Role
    router.post("/roles", createRole);
  
    // Retrieve all Roles
    router.get("/roles/getroles", getAllRoles);

    // Get Role by Id
    router.get('/roles/:role_id', getRoleById);

    // Update Role by Id
    router.put('/roles/:role_id', updateRole);

    // Delete Role by Id
    router.delete('/roles/:role_id', deleteRole);

    export default router;
  