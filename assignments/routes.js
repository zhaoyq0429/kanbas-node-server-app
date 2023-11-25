import db from "../Database/index.js";
function AssignmentsRoutes(app) {
  // Create a new assignment for a specific course
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.unshift(newAssignment);
    res.status(201).send(newAssignment);
  });

  // Retrieve all assignments for a specific course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  // Update a specific assignment by id
  app.put("/api/assignments/:aid", (req, res) => {
    //console.log("Request to update assignment with id:", req.params.aid);
    //console.log("Request body:", req.body);
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
    console.log("Found assignment index:", assignmentIndex);
    if (assignmentIndex > -1) {
      const updatedAssignment = {
        ...db.assignments[assignmentIndex],
        ...req.body,
      };
      db.assignments[assignmentIndex] = updatedAssignment;
      res.json(updatedAssignment); // Send back the updated assignment
    } else {
      res.sendStatus(404); // Not Found
    }
  });

  // Delete a specific assignment by id
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const initialLength = db.assignments.length;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    if (db.assignments.length < initialLength) {
      res.sendStatus(200); // OK
    } else {
      res.sendStatus(404); // Not Found
    }
  });
}
export default AssignmentsRoutes;
