import Dashboard from "./Component/Dashboard/Dashboard";
import Signin from "./Component/Signin/Signin";
import Students from "./Component/Dashboard/Students/Students";
import AddStudent from "./Component/Dashboard/Students/AddStudent";
import EditStudent from "./Component/Dashboard/Students/EditStudent";
import Group from "./Component/Dashboard/Groups/Group";
import AddGroup from "./Component/Dashboard/Groups/AddGroup";
import EditGroup from "./Component/Dashboard/Groups/EditGroup";
import Sessions from "./Component/Dashboard/Sessions/Sessions";
import AddSession from "./Component/Dashboard/Sessions/AddSession";
import EditSession from "./Component/Dashboard/Sessions/EditSession";
import Events from "./Component/Dashboard/Calenders/Calenders";
import AddEvent from "./Component/Dashboard/Calenders/AddCalender";
import EditEvent from "./Component/Dashboard/Calenders/EditCalender";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Assesments from "./Component/Dashboard/Assesments/Assesments";
import AddAssesment from "./Component/Dashboard/Assesments/AddAssesment";
import EditAssesment from "./Component/Dashboard/Assesments/EditAssesment";
import Grades from "./Component/Dashboard/Grades/Grades";
import AddGrade from "./Component/Dashboard/Grades/AddGrade";
import EditGrade from "./Component/Dashboard/Grades/EditGrade";
import Tasks from "./Component/Dashboard/Tasks/Tasks";
import EditTask from "./Component/Dashboard/Tasks/EditTask";
import AddTask from "./Component/Dashboard/Tasks/AddTask";
import Profile from "./Component/UserComponents/Profile";
import Users from "./Component/UserComponents/Users";
import GroupUser from "./Component/UserComponents/GroupUser";
import TaskUser from "./Component/UserComponents/TaskUser";
import GradeUser from "./Component/UserComponents/GradeUser";
import EventUser from "./Component/UserComponents/EventUser";
import AssesmentUser from "./Component/UserComponents/AssesmentUser";
import SessionUser from "./Component/UserComponents/SessionUser";
import Assignments from "./Component/Dashboard/Assignment/Assignments";
import CreateAssignment from "./Component/Dashboard/Assignment/CreateAssignment";
import AssignmentUser from "./Component/UserComponents/AssignmentUser";
import StudentSubAssignment from "./Component/Dashboard/Assignment/StudentSubAssignment";
import AssgFolder from "./Component/Dashboard/AssgFolder/Folders";
import UpdateFolder from './Component/Dashboard/AssgFolder/UpdateFolder.jsx'
import AddFolder from "./Component/Dashboard/AssgFolder/AddFolder";
import Documents from "./Component/Dashboard/documents/Documents";
import AddDocument from "./Component/Dashboard/documents/AddDocument";
import AssgFolderUser from "./Component/UserComponents/AssgFolderUser";
import DocumentUser from "./Component/UserComponents/DocumentUser";
import PsychometricTests from './Component/Dashboard/PsychometricTests/PsychometricTests.jsx'
import AddQestion from './Component/Dashboard/PsychometricTests/AddQuestion.jsx'
import PsychometricUser from './Component/UserComponents/PsychometricUser.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Students" element={<Students />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/EditStudent/:userId" element={<EditStudent />} />
        <Route path="/Groups" element={<Group />} />
        <Route path="/AddGroup" element={<AddGroup />} />
        <Route path="/EditGroup/:userId" element={<EditGroup />} />
        <Route path="/Sessions" element={<Sessions />} />
        <Route path="/AddSession" element={<AddSession />} />
        <Route path="/EditSession/:userId" element={<EditSession />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/EditEvent/:userId" element={<EditEvent />} />
        <Route path="/Assesments" element={<Assesments />} />
        <Route path="/AddAssesment" element={<AddAssesment />} />
        <Route path="/EditAssesment/:userId" element={<EditAssesment />} />
        <Route path="/Grades" element={<Grades />} />
        <Route path="/AddGrade" element={<AddGrade />} />
        <Route path="/EditGrade/:userId" element={<EditGrade />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/EditTask/:userId" element={<EditTask />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/GroupUser" element={<GroupUser />} />
        <Route path="/TaskUser" element={<TaskUser />} />
        <Route path="/GradeUser" element={<GradeUser />} />
        <Route path="/EventUser" element={<EventUser />} />
        <Route path="/AssesmentUser" element={<AssesmentUser />} />
        <Route path="/SessionUser" element={<SessionUser />} />
        <Route path="/Assignment" element={<Assignments />} />
        <Route path="/CreateAssignment" element={<CreateAssignment />} />
        <Route path="/AssignmentUser" element={<AssignmentUser />} />
        <Route path="/StudentSubAssignment/:id" element={<StudentSubAssignment />}/>
        <Route path="/AssgFolder" element={<AssgFolder/>}/>
        <Route path="/UpdateFolder/:id" element={<UpdateFolder/>}/>
        <Route path="/AddFolder" element={<AddFolder/>}/>
        <Route path="/Documents/:id" element={<Documents/>}/>
        <Route path="/AddDocument/:id" element={<AddDocument/>}/>
       <Route path="/AssgFolderUser" element={<AssgFolderUser/>}/>
       <Route path="/DocumentUser/:id" element={<DocumentUser/>}/>
       <Route path="/PsychometricTests" element={<PsychometricTests/>}/>
       <Route path="/AddQuestion" element={<AddQestion/>}/>
       <Route path="/PsychometricUser" element={<PsychometricUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
