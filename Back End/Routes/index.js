const router = require("express").Router();
const signupRole = require("../Controllers/AddRole/AddRole");
const AddAdmin = require("../Controllers/Admin/AddAdmin");
const loginAdmin = require("../Controllers/LoginAdmin/LoginAdmin");
const AddDoctor = require("../Controllers/Doctor/AddDoctor");
const AddPatient = require("../Controllers/Patient/AddPatient");
const GetPatients = require("../Controllers/Patient/GetPatient");
const GetSignelPatient = require("../Controllers/Patient/GetSinglePatient");
const deletePatient = require("../Controllers/Patient/DeletePatient");
const updatePatient = require("../Controllers/Patient/UpdatePatient");
const GetDoctors = require("../Controllers/Doctor/GetDoctors");
const UpdateStatus = require("./../Controllers/Patient/UpdateStatus");

const GetNurseStats = require("./../Controllers/Nurse/GetStats");

const updateDoctor = require("../Controllers/Doctor/UpdateDoctors");
const deleteDoctor = require("../Controllers/Doctor/DeleteDoctor");
const AddAppointment = require("../Controllers/Appointment/AddAppoint");
const getAppointments = require("../Controllers/Appointment/GetAppoint");
const deleteAppointments = require("../Controllers/Appointment/DeleteAppoint");
const loginPatient = require("../Controllers/LoginPatient/LoginPatient");
const loginDoctor = require("../Controllers/LoginDoctor/LoginDoctor");
const getAppointPatient = require("../Controllers/Appointment/GetAppPatient");
const getAppointDoctor = require("../Controllers/Appointment/GetAppDoctor");
const GetApprovedAppointments = require("../Controllers/Appointment/GetApprovedAppointments");
const GetPatientAppointments = require("../Controllers/Appointment/GetPatientAppointments");
const uploadFile = require("../MiddleWares/AddImage");
const getAdminDashboard = require("../Controllers/Admin/AdminDashBoardStat");
const addDepartment = require("../Controllers/Department/AddDepartment");
const getDepartments = require("../Controllers/Department/GetDepartment");
const addRoom = require("../Controllers/Room/AddRoom");
const getRooms = require("../Controllers/Room/GetRooms");
const updateRooms = require("../Controllers/Room/UpdateRoom");
const addNurse = require("../Controllers/Nurse/AddNurse");
const getNurses = require("../Controllers/Nurse/GetNurses");
const updateNurses = require("../Controllers/Nurse/UpdateNurse");
const deleteNurse = require("../Controllers/Nurse/DeleteNurse");
const loginNurse = require("../Controllers/LoginNurse/LoginNurse");
const getDoctorsByDep = require("../Controllers/Doctor/GetDoctorsByDep");
const deleteDepartment = require("../Controllers/Department/DeleteDepartment");
const updateDepartment = require("../Controllers/Department/UpdateDepartment");
const updateAppointment = require("../Controllers/Appointment/UpdateAppoint");
const AddPdf = require("../MiddleWares/AddPdf");
const AddBed = require("../Controllers/Bed/AddBed");
const getBed = require("../Controllers/Bed/GetBed");
const updateBed = require("../Controllers/Bed/UpdateBed");
//POst APi for creating data
router.route("/signup").post(signupRole);
router.route("/signupAdmin").post(uploadFile, AddAdmin);
router.route("/loginPatient").post(loginPatient);
router.route("/loginAdmin").post(loginAdmin);
router.route("/loginDoctor").post(loginDoctor);
router.route("/addDoctor").post(uploadFile, AddDoctor);
router.route("/addPatient").post(uploadFile, AddPatient);
router.route("/addDepartment").post(addDepartment);
router.route("/addAppointment").post(AddAppointment);
router.route("/addRoom").post(addRoom);
router.route("/addNurse").post(uploadFile, addNurse);
router.route("/loginNurse").post(loginNurse);
router.route("/doctorsByDep").post(getDoctorsByDep);
router.route("/addBed").post(AddBed);
//Getting the DATA
router.route("/getBeds/:id").get(getBed);
router.route("/getAllNurses").get(getNurses);
router.route("/getAllDepartments").get(getDepartments);
router.route("/getAllPatients").get(GetPatients);
router.route("/getAllDoctors").get(GetDoctors);
router.route("/getSinglePatient/:id").get(GetSignelPatient);
router.route("/getAllAppointments").get(getAppointments);
router.route("/getPatAppointments/:id").get(getAppointPatient);
router.route("/getDocAppointments/:id").get(getAppointDoctor);
router.route("/GetNurseStats").get(GetNurseStats);

router.route("/GetApprovedAppointments/:id").get(GetApprovedAppointments);
router
  .route("/GetPatientAppointments/:id/:doctorId")
  .get(GetPatientAppointments);
router.route("/getAllRooms").get(getRooms);
router.route("/adminDashboard").get(getAdminDashboard);

//Deleting the Data
router.route("/deleteNurse/:id").delete(deleteNurse);
router.route("/deletePatient/:id").delete(deletePatient);
router.route("/deleteDoctor/:id").delete(deleteDoctor);
router.route("/deleteAppointment/:id").delete(deleteAppointments);
router.route("/deleteDepartment/:id").delete(deleteDepartment);

//Update the Data
router.route("/updateNurse").put(updateNurses);
router.route("/updatePatient").put(updatePatient);
router.route("/updateStatus").put(UpdateStatus);
router.route("/updateDoctor").put(updateDoctor);
router.route("/updateRoom").put(updateRooms);
router.route("/updateDepartment").put(updateDepartment);
router.route("/updateAppointment").put(AddPdf, updateAppointment);
router.route("/updateBed").put(updateBed);
module.exports = router;
