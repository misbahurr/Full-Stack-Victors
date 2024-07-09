import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./component/Main";
import TeacherZone from "./component/teacherZone";
import Login from "./component/Login";
import SignUp from "./component/signup";
import Gallery from "./component/Gallery";
import StudentZone from "./component/studentZone";
import Resources from "./component/resources";
import StudentDashboard from "./component/studentDashboard";
import TeacherDashboard from "./component/teacherDashboard";
import TeacherResult from "./component/teacherResult";
import StudentResult from "./component/studentResult";
import TeacherAttendance from "./component/teacherAttendance";
import StudentAttendance from "./component/studentAttendance";
import StudentFees from "./component/studentFees";
import TimelineResource from "./timeline/timeline-resourses";
import StudentTimeline from "./timeline/studentTimeline";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/teacherSchedule/:id/:classname"><TeacherZone><TimelineResource/></TeacherZone></Route>
        <Route exact path="/studentSchedule/:id/:classname"><StudentZone><StudentTimeline/></StudentZone></Route>
        <Route path="/main" component={Main}/>
        
        <Route path="/teacherResources/:id/:classname"><TeacherZone><Resources ></Resources></TeacherZone></Route>
        <Route path="/studentResources/:id/:classname"><StudentZone><Resources ></Resources></StudentZone></Route>
        <Route path="/teacherDashboard/:id">
          <TeacherZone>
            <TeacherDashboard></TeacherDashboard>
          </TeacherZone>
        </Route>
        <Route path="/teacherAttendance/:id">
          <TeacherZone>
            <TeacherAttendance></TeacherAttendance>
          </TeacherZone>
        </Route>
        <Route path="/studentDashboard/:id">
          <StudentZone>
            <StudentDashboard></StudentDashboard>
          </StudentZone>
        </Route>
        <Route path="/studentResult/:id">
          <StudentZone>
            <StudentResult></StudentResult>
          </StudentZone>
        </Route>
        <Route path="/studentAttendance/:id">
          <StudentZone>
            <StudentAttendance></StudentAttendance>
          </StudentZone>
        </Route>
        <Route path="/studentFees/:id">
          <StudentZone>
            <StudentFees></StudentFees>
          </StudentZone>
        </Route>
        <Route path="/Login" component={Login}/>
        <Route path="/studentZone" component={StudentZone}/>
        <Route path="/Register" component={SignUp}/>
        <Route path="/Gallery" component={Gallery}/>
        <Route path="/teacherResult/:id"><TeacherZone><TeacherResult></TeacherResult></TeacherZone></Route>
        <Redirect from="/" to="/main" />
      </Switch>
    </div>
  );
}

export default App;
