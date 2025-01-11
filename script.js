const { useState, useEffect } = React;

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const HOLIDAYS = [
    { name: "VALENTINE'S DAY", date: new Date(2025, 1, 14) },
    { name: "MEMORIAL DAY", date: new Date(2025, 4, 26) },
    { name: "INDEPENDENCE DAY", date: new Date(2025, 6, 4) }
];

function YearProgress() {
    const [progress, setProgress] = useState(2.9);
    const [remaining, setRemaining] = useState(97.1);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [upcomingHolidays, setUpcomingHolidays] = useState([]);
    const [newMilestone, setNewMilestone] = useState('');
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

    return React.createElement(
        'div',
        { className: 'container' },
        [
            React.createElement('div', { className: 'controls', key: 'controls' },
                [
                    React.createElement('button', {
                        className: 'control-button',
                        key: 'theme'
                    }, '⚡ THEME'),
                    React.createElement('button', {
                        className: 'control-button',
                        key: 'milky'
                    }, '✨ MILKY'),
                    React.createElement('button', {
                        className: 'control-button',
                        key: 'fullscreen'
                    }, 'FULLSCREEN')
                ]
            ),
            React.createElement('div', { className: 'progress-text', key: 'progress' },
                `2025 IS ${progress.toFixed(1)}% COMPLETE`
            ),
            React.createElement('div', { key: 'monthly-progress' }, [
                React.createElement('div', { className: 'section-title' },
                    'MONTHLY PROGRESS'
                ),
                React.createElement('div', { className: 'months-list' },
                    MONTHS.map((month, index) =>
                        React.createElement('div', {
                            className: `month ${index === currentMonth ? 'current-month' : ''}`,
                            key: month
                        }, month)
                    )
                )
            ]),
            React.createElement('div', { className: 'remaining', key: 'remaining' }, [
                React.createElement('div', { className: 'section-title' },
                    'REMAINING'
                ),
                React.createElement('div', { className: 'remaining-percentage' },
                    `${remaining.toFixed(1)}% REMAINING`
                )
            ]),
            React.createElement('div', { key: 'holidays' }, [
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
            ]),
            React.createElement('div', { key: 'milestones' }, [
                React.createElement('div', { className: 'section-title' },
                    'PERSONAL MILESTONES'
                ),
                React.createElement('div', { className: 'milestone-form' }, [
                    React.createElement('input', {
                        type: 'text',
                        className: 'milestone-input',
                        placeholder: 'ENTER MILESTONE',
                        value: newMilestone,
                        onChange: (e) => setNewMilestone(e.target.value),
                        key: 'milestone-input'
                    }),
                    React.createElement('button', {
                        className: 'milestone-button',
                        onClick: () => {
                            if (newMilestone.trim()) {
                                setMilestones(prev => [...prev, { 
                                    date: new Date().toISOString().split('T')[0],
                                    description: newMilestone.trim()
                                }]);
                                setNewMilestone('');
                            }
                        },
                        key: 'add-button'
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
            ]),
            React.createElement('div', { className: 'year-label', key: 'year' },
                '2025'
            )
        ]
    );
}

// Initialize the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(YearProgress));
