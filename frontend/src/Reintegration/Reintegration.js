import React, { useState, useEffect, useCallback } from 'react';

const schoolInfo = [
    { _id: 'school-001', school_name: 'Accra Primary School' },
    { _id: 'school-002', school_name: 'University Basic School, Legon' },
    { _id: 'school-003', school_name: 'Greater Accra Region Primary School' },
    { _id: 'school-004', school_name: 'Kwame Nkrumah Primary School' }
];

const Reintegration = () => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [isLoading, setIsLoading] = useState(true);
    const [schoolName, setSchoolName] = useState('');
    const [error, setError] = useState(null);

    const fetchSchoolInfo = useCallback(async (schoolId) => {
        try {
            const school = schoolInfo.find(school => school._id === schoolId);
            if (school) {
                setSchoolName(school.school_name);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setError('School not found');
            }
        } catch (error) {
            console.error('Error fetching school info:', error);
            setError('Failed to fetch school info');
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const schoolId = urlParams.get('school_id');
            const year = urlParams.get('year') || selectedYear;

            console.log('schoolId:', schoolId); // Debugging
            console.log('year:', year); // Debugging

            setSelectedYear(year);

            if (!schoolId) {
                setIsLoading(false);
                setError('No school ID provided in the URL');
                return;
            }

            try {
                await fetchSchoolInfo(schoolId);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedYear, fetchSchoolInfo]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Reintegration Page</h1>
            <p>School Name: {schoolName}</p>
            <p>Selected Year: {selectedYear}</p>
            <select value={selectedYear} onChange={handleYearChange}>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
            </select>
        </div>
    );
};

export default Reintegration;