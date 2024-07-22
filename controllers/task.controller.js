import Task from "../models/Task.model.js";
import User from "../models/User.model.js";


export const createTasks = async (req, res) => {
  try {
    console.log(req.body)
    const { userId, description, taskNumber } = req.body;
    const newTask = await new Task({
      userId,
      description,
      taskNumber
    });
    await newTask.save();
    const allTasks = await Task.find({ userId });
    res.status(201).json(allTasks);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// DELETE
export const deleteTasks = async (req,res)=>{
  try{
      await Task.findByIdAndDelete(req.params.id)
      const userId = req.params.userId;
      const afterDeletion = await Task.find({ userId });
      res.status(200).json(afterDeletion)
  }
  catch(err){
      res.status(500).json(err)
  }
}

export const updateTask = async (req, res) => {
  try {
      const { userId, description, taskId } = req.body;
      console.log("req.body", req.body);
      
      const task = await Task.findById(taskId);

      if (!task) {
          return res.status(404).json({ message: "Task not found" });
      }

      if (description) task.description = description;

      await task.save();

      // Retrieve all tasks for the user
      const userTasks = await Task.find({ userId });

      res.status(200).json(userTasks);
  } catch (err) {
      res.status(409).json({ message: err.message });
  }
}

// Fetch all tasks for a user
export const fetchTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update the status of a task
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    // Retrieve all tasks for the user
    const userTasks = await Task.find({ userId: task.userId });

    res.status(200).json(userTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
