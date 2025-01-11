const { useState, useEffect } = React;

const HOLIDAYS_2025 = [
    { name: "New Year's Day", date: new Date(2025, 0, 1) },
    { name: "Valentine's Day", date: new Date(2025, 1, 14) },
    { name: "St. Patrick's Day", date: new Date(2025, 2, 17) },
    { name: "Easter", date: new Date(2025, 3, 20) },
    { name: "Memorial Day", date: new Date(2025, 4, 26) },
    { name: "Independence Day", date: new Date(2025, 6, 4) },
    { name: "Labor Day", date: new Date(2025, 8, 1) },
    { name: "Halloween", date: new Date(2025, 9, 31) },
    { name: "Thanksgiving", date: new Date(2025, 10, 27) },
    { name: "Christmas", date: new Date(2025, 11, 25) }
];

const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

function YearProgress() {
    // State management
    const [progress, setProgress] = useState(0);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [seasonProgress, setSeasonProgress] = useState(0);
    const [currentSeason, setCurrentSeason] = useState('');
    const [elapsedTime, setElapsedTime] = useState('');
    const [milestones, setMilestones] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('milestones')) || [];
        } catch {
            return [];
        }
    });

    // Theme handling
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Fullscreen handling
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Calculate season progress
    const calculateSeasonProgress = (now) => {
        const seasons = {
            Winter: { start: new Date(2024, 11, 21), end: new Date(2025, 2, 20) },
            Spring: { start: new Date(2025, 2, 20), end: new Date(2025, 5, 21) },
            Summer: { start: new Date(2025, 5, 21), end: new Date(2025, 8, 23) },
            Fall: { start: new Date(2025, 8, 23), end: new Date(2025, 11, 21) }
        };

        for (const [season, { start, end }] of Object.entries(seasons)) {
            if (now >= start && now < end) {
                setCurrentSeason(season);
                const total = end - start;
                const elapsed = now - start;
                setSeasonProgress((elapsed / total) * 100);
                break;
            }
        }
    };

    // Main progress calculation
    useEffect(() => {
        const calculateProgress = () => {
            const now = new Date();
            const start = new Date(2025, 0, 1);
            const end = new Date(2026, 0, 1);
            const total = end - start;
            const elapsed = now - start;
            const percentage = (elapsed / total) * 100;
            
            setProgress(percentage);
            calculateSeasonProgress(now);

            // Calculate time elapsed
            const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
            const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            setElapsedTime(`${days} days and ${hours} hours since New Year's Day`);
        };

        calculateProgress();
        const interval = setInterval(calculateProgress, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Save milestones to localStorage
    useEffect(() => {
        localStorage.setItem('milestones', JSON.stringify(milestones));
    }, [milestones]);

    // Add new milestone
    const addMilestone = (e) => {
        e.preventDefault();
        const date = e.target.date.value;
        const description = e.target.description.value;
        if (date && description) {
            setMilestones(prev => [...prev, { date, description }]);
            e.target.reset();
        }
    };

    // Export data
    const exportData = () => {
        const data = {
            progress,
            milestones,
            theme,
            timestamp: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'year-progress-2025.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return React.createElement(
        'div',
        { className: `container ${isFullscreen ? 'fullscreen' : ''}` },
        [
            // Header with controls
            React.createElement('div', { className: 'header', key: 'header' }, [
                React.createElement('button', {
                    className: 'button',
                    onClick: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
                    key: 'theme-toggle'
                }, `${theme === 'light' ? '🌙' : '☀️'} Theme`),
                React.createElement('button', {
                    className: 'button',
                    onClick: toggleFullscreen,
                    key: 'fullscreen-toggle'
                }, isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen')
            ]),

            // Main progress bar
            React.createElement('div', { className: 'progress-container', key: 'progress' }, [
                React.createElement('div', {
                    className: 'progress-bar',
                    style: { width: `${progress}%` }
                }),
                React.createElement('div', { className: 'progress-text' },
                    `2025 is ${progress.toFixed(1)}% complete.`)
            ]),

            // Grid of cards
            React.createElement('div', { className: 'grid', key: 'grid' }, [
                // Calendar Card
                React.createElement('div', { className: 'card', key: 'calendar' }, [
                    React.createElement('div', { className: 'card-title' }, 'Monthly Progress'),
                    React.createElement('div', { className: 'calendar' },
                        MONTHS.map((month, index) =>
                            React.createElement('div', {
                                className: `month ${index < new Date().getMonth() ? 'completed' : ''} 
                                          ${index === new Date().getMonth() ? 'current' : ''}`,
                                key: month
                            }, month)
                        )
                    )
                ]),

                // Season Card
                React.createElement('div', { className: 'card', key: 'season' }, [
                    React.createElement('div', { className: 'card-title' }, 'Season Progress'),
                    React.createElement('div', {}, `Current Season: ${currentS
