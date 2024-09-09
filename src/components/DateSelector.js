import React,
{
    useState
} from 'react';

const DateSelector = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        onDateChange(date);
    };

    return (
        <div>
            <label htmlFor="date" style={{ fontSize: '40px'}}>
                Select Date:
            </label>
            <input type="date" id="date" style={{ fontSize: '25px', width: '200px', height: '40px'}}
                value={selectedDate}
                onChange={handleDateChange} />
        </div>
    );
};

export default DateSelector;