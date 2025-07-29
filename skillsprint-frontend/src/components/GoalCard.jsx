import React from 'react';
import { format } from 'date-fns';
import { FaTrash, FaRegCalendarAlt, FaPencilAlt } from 'react-icons/fa';
import './GoalCard.css';

// The component now accepts an "onEdit" prop
const GoalCard = ({ goal, onEdit, onDelete }) => {
  return (
    <div className="goal-card">
      <div className="goal-card-header">
        <h3>{goal.title}</h3>
        <div className="goal-card-actions">
          {/* The new edit button */}
          <button onClick={() => onEdit(goal)} className="action-button edit-button">
            <FaPencilAlt />
          </button>
          <button onClick={() => onDelete(goal.id)} className="action-button delete-button">
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="goal-card-description">{goal.description || 'No description provided.'}</p>
      <div className="goal-card-footer">
        <span className="goal-card-date">
          <FaRegCalendarAlt />
          End Date: {format(new Date(goal.endDate), 'MMM dd, yyyy')}
        </span>
        <span className={`goal-card-status status-${goal.status.replace(/\s+/g, '-').toLowerCase()}`}>
          {goal.status}
        </span>
      </div>
    </div>
  );
};

export default GoalCard;