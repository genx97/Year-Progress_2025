const { useState, useEffect } = React;

function YearProgress() {
    const [progress, setProgress] = useState(2.8);
    const [countdown, setCountdown] = useState('');
    const [week, setWeek] = useState(3);
    const [season, setSeason] = useState('Winter');

    useEffect(() => {
        const calculateProgress = () => {
            const now = new Date();
            const start = new Date(2025, 0, 1);
            const end = new Date(2026, 0, 1);
            const total = end - start;
            const elapsed = now - start;
            const percentage = (elapsed / total) * 100;
            
            // Calculate remaining time
            const remaining = end - now;
            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            
            setProgress(percentage);
            setCountdown(`${days} days, ${hours} hours, ${minutes} minutes remaining in 2025`);
            
            // Calculate week number
            const weekNumber = Math.ceil((now - start) / (1000 * 60 * 60 * 24 * 7));
            setWeek(weekNumber);
            
            // Determine season
            const month = now.getMonth();
            if (month < 2 || month === 11) setSeason('Winter');
            else if (month < 5) setSeason('Spring');
            else if (month < 8) setSeason('Summer');
            else setSeason('Fall');
        };

        calculateProgress();
        const interval = setInterval(calculateProgress, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleShare = () => {
        // Implement share functionality here
        alert('Share functionality would go here');
    };

    return React.createElement(
        'div',
        { className: 'container' },
        [
            React.createElement('div', { className: 'completion-text', key: 'completion' },
                `2025 is ${progress.toFixed(1)}% complete.`
            ),
            React.createElement('div', { className: 'progress-container', key: 'progress' },
                [
                    React.createElement('div', {
                        className: 'progress-bar',
                        style: { width: `${progress}%` }
                    }),
                    React.createElement('div', { className: 'remaining-text' },
                        `${(100 - progress).toFixed(1)}% remaining.`
                    )
                ]
            ),
            React.createElement('div', { className: 'countdown-text', key: 'countdown' },
                countdown
            ),
            React.createElement('div', { className: 'info-text', key: 'info' },
                `Week ${week}    ${season}`
            ),
            React.createElement('button', {
                className: 'share-button',
                onClick: handleShare,
                key: 'share'
            }, 'Share Progress')
        ]
    );
}

// Initialize the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(YearProgress));
