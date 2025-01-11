const { useState, useEffect } = React;

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const HOLIDAYS = [
    { name: "NEW YEAR'S DAY", date: new Date(2025, 0, 1) },
    { name: "VALENTINE'S DAY", date: new Date(2025, 1, 14) },
    { name: "MEMORIAL DAY", date: new Date(2025, 4, 26) },
    { name: "INDEPENDENCE DAY", date: new Date(2025, 6, 4) },
    { name: "LABOR DAY", date: new Date(2025, 8, 1) },
    { name: "HALLOWEEN", date: new Date(2025, 9, 31) },
    { name: "THANKSGIVING", date: new Date(2025, 10, 27) },
    { name: "CHRISTMAS", date: new Date(2025, 11, 25) }
];

function YearProgress() {
    const [progress, setProgress] = useState(2.7);
    const [remaining, setRemaining] = useState(97.3);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [upcomingHolidays, setUpcomingHolidays] = useState([]);
    const [showMilky, setShowMilky] = useState(false);
    const [milestones, setMilestones] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('milestones')) || [];
        } catch {
            return [];
        }
    });

    const updateHolidays = (now) => {
        const upcoming = HOLIDAYS
            .filter(holiday => holiday.date > now)
            .sort((a, b) => a.date - b.date)
            .slice(0, 3)
            .map(holiday => ({
                ...holiday,
                daysUntil: Math.ceil((holiday.date - now) / (1000 * 60 * 60 * 24))
            }));
        setUpcomingHolidays(upcoming);
    };

    useEffect(() => {
        const calculateProgress = () => {
            const now = new Date();
            const start = new Date(2025, 0, 1);
            const end = new Date(2026, 0, 1);
            const total = end - start;
            const elapsed = now - start;
            const percentage = (elapsed / total) * 100;
            
            setProgress(percentage);
            setRemaining(100
