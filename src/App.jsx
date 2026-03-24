// Pro-Vision Keikkasuunnittelu application
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import GigDetailDrawer from './GigDetailDrawer';
import Toast from './Toast';
import { exportPDF } from './pdfExport';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ProVisionApp = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [conflict, setConflict] = useState(false);

    useEffect(() => {
        // Load events from an API or state
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        // Fetch events from your data source
        // setEvents(fetchedEvents);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setShowDrawer(true);
    };

    const handleSelectSlot = ({ start, end }) => {
        const newEvent = { start, end, title: 'New Event' };
        if (checkConflict(newEvent)) {
            setConflict(true);
            setToastMessage('Conflict detected!');
            return;
        } else {
            setConflict(false);
            setToastMessage('');
        }
        setEvents([...events, newEvent]);
    };

    const checkConflict = (newEvent) => {
        return events.some(event =>
            (newEvent.start < event.end && newEvent.end > event.start)
        );
    };

    const handleExportPDF = () => {
        exportPDF(events);
        setToastMessage('Events exported to PDF.');
    };

    return (
        <div>
            <h1>Pro-Vision Keikkasuunnittelu</h1>
            <button onClick={handleExportPDF}>Export to PDF</button>
            {toastMessage && <Toast message={toastMessage} />}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
            />
            {showDrawer && <GigDetailDrawer gig={selectedEvent} onClose={() => setShowDrawer(false)} />}
        </div>
    );
};

export default ProVisionApp;