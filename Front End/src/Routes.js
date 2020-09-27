import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminDashBoard from "./AdminDashBoard";
import Home from "./HomeWrapper";
import PatientTable from "./PatientTable";
import AddPatient from "./AddPatient";
import DoctorTable from "./DoctorTable";
import AddDoctor from "./AddDoctor";
import CreateAppointment from "./CreateAppointment";
import AdminView from "./AdminView";
import AppointmentTable from "./AppointmentsTable";
import PatientDashboard from "./PatientDashboard";
import PatientAppointments from "./PatientAppointments";
import Login from "./NavElements/Login";
import SignUp from "./SignUp";
import PatientAppWrapper from "./PatientAppointmentWrapper";

import CreatePatAppWrapper from "./CreatePatAppWrapper";
import DoctorAppWrapper from "./DoctorAppointmentWrapper";
import DoctorDashboard from "./DoctorDashboard";
import AdminAppointment from "./AdminAppointment";
import AdminAddDoc from "./AdminAddDoc";
import PatientInfo from "./PatientInfo";
import DoctorAppointmentsApproved from "./DoctorPatientsAppointments";
import PatientHistory from "./PatientHistory";
import SingleAppointmentDetails from "./SingleAppointmentDetails";
import NurseAppointmentsSingle from "./NurseAppointmentsSingle";

import AdminAddPat from "./AdminAddPat";
import PublicDepartments from "./NavElements/Departments";
import RoomTable from "./RoomTable";
import RoomAllotment from "./BedAllotment";
import NursesTable from "./NursesTable";
import AddNurse from "./AddNurse";
import NurseDashboard from "./NurseDashboard";
import NurseRooms from "./NurseRooms";
import NurseAppointments from "./NurseAppointments";
import ContactUs from "./NavElements/contactUs";
import DepDoctor from "./NavElements/DepDoctors";
import DepartmentTable from "./DepartmentTable";
import AddDepartment from "./AddDepartment";
import AdminRoute from "./AdminProctectedRoute";
import PatientRoute from "./PatientProctectedRoute";
import NurseRoute from "./NurseProctectedRoute copy";
import DoctorRoute from "./DoctorProtectedRoute";
import NotFound from "./NotFound";
import AddPrescription from "./AddPrescription";
import AppDetail from "./AppointmentDetail";
import BedsTable from "./BedsTable";
import BedsTable1 from "./BedsTable1";
import AddRoom from "./AddRoom";
import AddRoomNurse from "./AddRoomNurse";
import BedAllotment from "./BedAllotment";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Global Access  */}
        <Route exact path='/' component={Login} />
        <Route exact path='/contact-us' component={ContactUs} />
        <Route exact path='/departments' component={PublicDepartments} />
        <Route exact path='/dep-doctor/:id' component={DepDoctor} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/allotment-bed/:room' component={BedAllotment} />
        <Route exact path='/detail-appointment' component={AppDetail} />
        {/* Admin Role Access  */}
        <AdminRoute
          exact
          path='/create-appointment'
          component={AdminAppointment}
        />
        <AdminRoute exact path='/Admin-Dashboard' Component={AdminView} />
        <AdminRoute exact path='/Admin-Doc' Component={AdminAddDoc} />
        <AdminRoute exact path='/Admin-Pat' Component={AdminAddPat} />
        <AdminRoute
          exact
          path='/all-appointments'
          Component={AppointmentTable}
        />
        <AdminRoute exact path='/beds/:id' Component={BedsTable} />
        <AdminRoute exact path='/add-doctors' Component={AddDoctor} />
        <AdminRoute exact path='/patient/:id' Component={PatientInfo} />
        <AdminRoute exact path='/add-patient' Component={AddPatient} />
        <AdminRoute exact path='/patients' Component={PatientTable} />
        <AdminRoute exact path='/doctors' Component={DoctorTable} />
        <AdminRoute exact path='/rooms' Component={RoomTable} />
        <AdminRoute
          exact
          path='/admin-departments'
          Component={DepartmentTable}
        />
        <AdminRoute exact path='/add-departments' Component={AddDepartment} />
        <AdminRoute exact path='/admin-nurses' Component={NursesTable} />
        <AdminRoute exact path='/add-nurse' Component={AddNurse} />
        <AdminRoute exact path='/add-room' Component={AddRoom} />

        {/* Patient  */}
        <PatientRoute
          exact
          path='/Patient-Dashboard'
          Component={PatientDashboard}
        />
        <PatientRoute
          exact
          path='/get-appointment'
          Component={CreatePatAppWrapper}
        />
        <PatientRoute
          exact
          path='/my-appointments'
          Component={PatientAppWrapper}
        />
        {/* Doctor  */}
        <DoctorRoute
          exact
          path='/Doctor-Dashboard'
          Component={DoctorDashboard}
        />
        <DoctorRoute
          exact
          path='/Doctor-Prescription'
          Component={AddPrescription}
        />
        <DoctorRoute
          exact
          path='/doctors-appointments'
          Component={DoctorAppWrapper}
        />
        <DoctorRoute
          exact
          path='/doctors-patients'
          Component={DoctorAppointmentsApproved}
        />
        <DoctorRoute
          exact
          path='/patient-history/:patientId'
          Component={PatientHistory}
        />
        <DoctorRoute
          exact
          path='/patient-appointment/details'
          Component={SingleAppointmentDetails}
        />

        {/* Nurse  */}
        <NurseRoute exact path='/Nurse-Dashboard' Component={NurseDashboard} />
        <NurseRoute exact path='/nurse-rooms' Component={NurseRooms} />
        <NurseRoute exact path='/add-room-nurse' Component={AddRoomNurse} />
        <NurseRoute
          exact
          path='/nurse-appointments'
          Component={NurseAppointments}
        />
        <NurseRoute
          exact
          path='/nurse-appointment-single/details'
          Component={NurseAppointmentsSingle}
        />
        <NurseRoute exact path='/beds-nurse/:id' Component={BedsTable1} />
        <NurseRoute exact path='/allotment-room' Component={RoomAllotment} />
        <Route path='*' component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
