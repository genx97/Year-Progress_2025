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
            setRemaining(100 - percentage);
            setCurrentMonth(now.getMonth());
            updateHolidays(now);
        };

        calculateProgress();
        const interval = setInterval(calculateProgress, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem('milestones', JSON.stringify(milestones));
    }, [milestones]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const toggleMilkyEffect = () => {
        setShowMilky(prev => !prev);
    };

    const addMilestone = (e) => {
        e.preventDefault();
        const date = e.target.date.value;
        const description = e.target.description.value.toUpperCase();
        if (date && description) {
            setMilestones(prev => [...prev, { date, description }]);
            e.target.reset();
        }
    };

    return React.createElement(
        'div',
        { className: `container ${isFullscreen ? 'fullscreen' : ''} ${showMilky ? 'show-milky' : ''}` },
        [
            React.createElement('div', { className: 'button-group', key: 'buttons' },
                [
                    React.createElement('button', {
                        className: 'button',
                        onClick: () => document.documentElement.classList.toggle('dark'),
                        key: 'theme'
                    }, '⚡ THEME'),
                    React.createElement('button', {
                        className: 'button',
                        onClick: toggleMilkyEffect,
                        key: 'milky'
                    }, '✨ MILKY'),
                    React.createElement('button', {
                        className: 'button',
                        onClick: toggleFullscreen,
                        key: 'fullscreen'
                    }, isFullscreen ? 'EXIT' : 'FULLSCREEN')
                ]
            ),
            React.createElement('div', { className: 'progress-container', key: 'progress' },
                [
                    React.createElement('div', {
                        className: 'progress-bar',
                        style: { width: `${progress}%` }
                    }),
                    React.createElement('div', { className: 'progress-text' },
                        `2025 IS ${progress.toFixed(1)}% COMPLETE`
                    )
                ]
            ),
            React.createElement('div', { className: 'section', key: 'calendar' },
                [
                    React.createElement('div', { className: 'section-title' },
                        'MONTHLY PROGRESS'
                    ),
                    React.createElement('div', { className: 'month-grid' },
                        MONTHS.map((month, index) =>
                            React.createElement('div', {
                                className: `month ${index === currentMonth ? 'current-month' : ''}`,
                                key: month
                            }, month)
                        )
                    )
                ]
            ),
            React.createElement('div', { className: 'section', key: 'remaining' },
                [
                    React.createElement('div', { className: 'section-title' },
                        'REMAINING'
                    ),
                    React.createElement('div', { className: 'remaining-text' },
                        `${remaining.toFixed(1)}% REMAINING`
                    )
                ]
            ),
            React.createElement('div', { className: 'section', key: 'holidays' },
                [
                    React.createElement('div', { className: 'section-title' },
                        'UPCOMING HOLIDAYS'
                    ),
                    React.createElement('div', { className: 'holiday-list' },
                        upcomingHolidays.map(holiday =>
                            React.createElement('div', {
                                className: 'holiday-item',
                                key: holiday.name
                            }, `${holiday.name} - ${holiday.daysUntil} DAYS`)
                        )
                    )
                ]
            ),
            React.createElement('div', { className: 'section', key: 'milestones' },
                [
                    React.createElement('div', { className: 'section-title' },
                        'PERSONAL MILESTONES'
                    ),
                    React.createElement('form', {
                        className: 'milestone-form',
                        onSubmit: addMilestone
                    }, [
                        React.createElement('input', {
                            type: 'date',
                            className: 'milestone-input',
                            name: 'date',
                            required: true
                        }),
                        React.createElement('input', {
                            type: 'text',
                            className: 'milestone-input',
                            name: 'description',
                            placeholder: 'ENTER MILESTONE',
                            required: true
                        }),
                        React.createElement('button', {
                            type: 'submit',
                            className: 'button'
                        }, 'ADD MILESTONE')
                    ]),
                    React.createElement('div', { className: 'milestone-list' },
                        milestones.map((milestone, index) =>
                            React.createElement('div', {
                                className: 'milestone-item',
                                key: index
                            }, `${milestone.date}: ${milestone.description}`)
                        )
                    )
                ]
            )
        ]
    );
}

// Initialize the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(YearProgress));
