import Database from "../Database/index.js";
function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses.find((c) => c._id.$oid === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.unshift(course);
    res.send(course);
  });
  app.delete("/api/courses/:id", (req, res) => {
    console.log("Attempting to delete course with ID:", req.params.id);
    console.log("Courses before deletion:", Database.courses);
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id.$oid !== id);
    console.log("Courses after deletion:", Database.courses);
    res.sendStatus(204);
  });
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id.$oid === id ? { c, ...course } : c
    );
    res.sendStatus(204);
  });
}
export default CourseRoutes;
