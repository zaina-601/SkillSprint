import React, { useState, useEffect } from 'react';
import * as GoalService from '../api/goal.service';
import GoalCard from '../components/GoalCard';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { FaPlus } from 'react-icons/fa';
import './DashboardPage.css';

const DashboardPage = ({ title = 'Dashboard' }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // State to determine if the modal is for editing or creating
  const [isEditMode, setIsEditMode] = useState(false);
  
  // A single state to hold the form data for either creating or editing
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Started',
  });

  const emptyForm = { id: null, title: '', description: '', startDate: '', endDate: '', status: 'Not Started' };

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data } = await GoalService.getAllGoals();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers for Modal and Forms ---

  const handleOpenCreateModal = () => {
    setIsEditMode(false); // Set to create mode
    setFormData(emptyForm); // Use an empty form
    setShowModal(true);
  };

  const handleOpenEditModal = (goal) => {
    setIsEditMode(true); // Set to edit mode
    // Pre-fill the form with the goal's data, formatting dates correctly
    setFormData({
      ...goal,
      startDate: new Date(goal.startDate).toISOString().split('T')[0],
      endDate: new Date(goal.endDate).toISOString().split('T')[0],
    });
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // If editing, call the update service
        await GoalService.updateGoal(formData.id, formData);
      } else {
        // If creating, call the create service
        await GoalService.createGoal(formData);
      }
      handleCloseModal();
      fetchGoals(); // Refresh the list of goals to show changes
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await GoalService.deleteGoal(id);
        fetchGoals(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete goal:", error);
      }
    }
  };

  // --- Render Logic ---

  if (loading) return <div className="fullscreen-spinner"><Spinner /></div>;

  return (
    <div>
      <div className="dashboard-header">
        <h1>{title}</h1>
        <button onClick={handleOpenCreateModal} className="add-goal-button">
          <FaPlus />
          Create Goal
        </button>
      </div>
      
      <div className="goals-grid">
        {goals.length > 0 ? (
          goals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onEdit={handleOpenEditModal} // Pass the handler to the card
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <p className="no-goals-message">You haven't set any goals yet. Time to start sprinting!</p>
        )}
      </div>

      <Modal 
        title={isEditMode ? "Edit Goal" : "Create a New Goal"} 
        show={showModal} 
        onClose={handleCloseModal}
      >
        <form onSubmit={handleSubmit} className="goal-form">
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3}></textarea>
          </div>
          {/* Only show the status dropdown when editing */}
          {isEditMode && (
            <div className="input-group">
                <label htmlFor="status">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
          )}
          <div className="date-inputs">
            <div className="input-group">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="endDate">End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
            </div>
          </div>
          <button type="submit" className="form-submit-button">
            {isEditMode ? "Save Changes" : "Create Goal"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardPage;