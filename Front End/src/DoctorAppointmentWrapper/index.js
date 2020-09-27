import React from 'react';
import PatientWrapper from '../PatientWrapper';
import PatientAppointments from '../PatientAppointments';
import DoctorWrapper from '../DoctorWrapper';
import DoctorAppointments from '../DoctorAppointments';
const DoctorAppWrapper = () => {
    return (
    <DoctorWrapper>
        <DoctorAppointments />
    </DoctorWrapper>
    );
}

export default DoctorAppWrapper;