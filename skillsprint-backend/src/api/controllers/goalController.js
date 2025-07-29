const { Goal } = require('../models');

// Create a new goal
exports.createGoal = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;
    const goal = await Goal.create({
      title,
      description,
      startDate,
      endDate,
      userId: req.userData.userId,
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal', error: error.message });
  }
};

// Get all goals for the logged-in user
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({ where: { userId: req.userData.userId } });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
};

// Get a single goal by ID
exports.getGoalById = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findOne({
      where: { id, userId: req.userData.userId },
    });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goal', error: error.message });
  }
};

// Update a goal
exports.updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await Goal.findOne({ where: { id, userId: req.userData.userId } });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found or you are not authorized.' });
        }

        const updatedGoal = await goal.update(req.body);
        
        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: 'Error updating goal', error: error.message });
    }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Goal.destroy({
      where: { id, userId: req.userData.userId }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Goal not found or you are not authorized' });
    }
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
  }
};