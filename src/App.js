import HomePage from './Components/HomePageComponents/HomePage'
import Login from './Components/Login/Login'
import VotingPage from './Components/Voting/VoteHome'
import SurveyForm from './Components/Survey/SurveyForm'
import UserDashBoard from './Components/DashBoard/UserDashBoard'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EnquiryForm from './Components/Enquiry/EnquiryForm'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Login" element={<Login />} />
        <Route path="UserDashBoard" element={<UserDashBoard />} />
        <Route path="VotingPage" element={<VotingPage />} />
        <Route path="SurveyForm" element={<SurveyForm />} />
        <Route path="EnquiryForm" element={<EnquiryForm />} />
        {/* <Route path="VotingPage" element={<VotingPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
