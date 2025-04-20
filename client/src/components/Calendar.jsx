// src/components/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from './Modal';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService';

const localizer = momentLocalizer(moment);

function CalendarApp() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    allDay: false,
    desc: '',
    createdBy: localStorage.getItem('username') || 'Anonymous'
  });

  // Load events on component mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      
      // Convert string dates to Date objects for react-big-calendar
      const formattedEvents = data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      
      setEvents(formattedEvents);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({
      title: '',
      start,
      end,
      allDay: false,
      desc: '',
      createdBy: localStorage.getItem('username') || 'Anonymous'
    });
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setNewEvent({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    });
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSaveEvent = async () => {
    try {
      if (!newEvent.title.trim()) {
        alert('Please enter an event title');
        return;
      }

      if (selectedEvent) {
        // Update existing event
        await updateEvent(selectedEvent._id, newEvent);
      } else {
        // Add new event
        await createEvent(newEvent);
      }
      
      // Reload events to get fresh data
      await loadEvents();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save event. Please try again.');
      console.error('Error saving event:', err);
    }
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent && window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(selectedEvent._id);
        await loadEvents();
        setShowModal(false);
      } catch (err) {
        setError('Failed to delete event. Please try again.');
        console.error('Error deleting event:', err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDateChange = (name, date) => {
    setNewEvent({
      ...newEvent,
      [name]: date
    });
  };

  const handleRefresh = () => {
    loadEvents();
  };

  if (loading && events.length === 0) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Team Calendar</h1>
        <div className="user-info">
          <span>Logged in as: {localStorage.getItem('username') || 'Anonymous'}</span>
          <button className="refresh-button" onClick={handleRefresh}>
            Refresh Calendar
          </button>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="calendar-wrapper">
      <Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  selectable
  onSelectEvent={handleSelectEvent}
  onSelectSlot={handleSelectSlot}
  style={{ height: 600 }}
  view={currentView}
  onView={view => setCurrentView(view)}
  date={currentDate}
  onNavigate={date => setCurrentDate(date)}
  toolbar={true}
  views={['month', 'week', 'day']}
  eventPropGetter={(event) => ({
    className: 'event-item',
    style: {
      backgroundColor: event.createdBy === (localStorage.getItem('username') || 'Anonymous') ? '#3174ad' : '#7e57c2'
    }
  })}
/>

      
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Start:</label>
            <input
              type="datetime-local"
              name="start"
              value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => handleDateChange('start', new Date(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>End:</label>
            <input
              type="datetime-local"
              name="end"
              value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => handleDateChange('end', new Date(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="allDay"
                checked={newEvent.allDay}
                onChange={handleChange}
              />
              All Day
            </label>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="desc"
              value={newEvent.desc}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Created By:</label>
            <input
              type="text"
              name="createdBy"
              value={newEvent.createdBy}
              onChange={handleChange}
              disabled={selectedEvent}
            />
          </div>
          <div className="button-group">
            <button onClick={handleSaveEvent}>Save</button>
            {selectedEvent && (
              <button onClick={handleDeleteEvent} className="delete-button">
                Delete
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CalendarApp;