import { Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Unauthorized from "../components/Unauthorized";

import Dashboard from "../pages/Dashboard";
import PrototypeA from "../assets/prototype/prototypeA";
import PrototypeB from "../assets/prototype/prototypeB";
import Individual from "../pages/incident/register/Individual";
import Bulk from "../pages/incident/register/Bulk";
import IncidentLog from "../pages/incident/log/IncidentLog";
import RejectIncidents from "../pages/incident/log/RejectIncidents";
import RejectLog from "../pages/incident/log/RejectLog";
import MediationBoard from "../pages/drc/MediationBoard";
import PeriodExtensionApproval from "../pages/drc/PeriodExtensionApproval";
import DRCLog from "../pages/drc/DrcLog";
import AssignedDRCLog from "../pages/drc/AssignedDRCLog";
import ReAssignDRC from "../pages/drc/ReAssignDRC";
import AssignDRC from "../pages/drc/AssignDRC";
import DRCApproval from "../pages/drc/DRCApproval";
import Pending from "../pages/drc/Pending";
import MediationBoardSendingRequests from "../pages/drc/MediationBoardSendingRequest";
import MediationBoardAccept from "../pages/drc/MediationBoardAccept";
import MediationBoardResponseLog from "../pages/drc/MediationBoardResponseLog";
import Logs from "../pages/drc/logs";

import FtlLodList from "../pages/lod/ftl_lod/ftl_lod/List";
import FtlLodLog from "../pages/lod/ftl_lod/ftl_lod_log/FltLodLog";
import Litigation from "../pages/lod/ftl_lod/litigation/Litigation";
import LitigationLog from "../pages/lod/ftl_lod/litigation/LitigationLog";
import PostLitigationLog from "../pages/lod/ftl_lod/litigation/PostLitigationLog";
import LitigationSubmission from "../pages/lod/ftl_lod/litigation/LitigationSubmission";
import LitigationPage from "../pages/lod/ftl_lod/litigation/LitigationPage";
import LODLog from "../pages/lod/digital_signature_lod/lod/LodLog";
import FinalReminderLog from "../pages/lod/digital_signature_lod/final_reminder/FRLog";
import ListLOdSubmission from "../pages/lod/ftl_lod/ftl_lod/list/ListOfLodSubmission";
import ListLOdSubmitedCases from "../pages/lod/ftl_lod/ftl_lod/list/ListOfSubmittedCases";
import Adjustments from "../pages/settlement/monitor_settlement/Adjusments";
// import IncidentDetails from "../pages/incident/log/details";
import IncidentFileDownload from "../pages/incident/log/file-download";
import IncidentUploadLog from "../pages/incident/log/upload-log";
import CaseDetails from "../pages/incident/log/CaseDetails";
import CaseList from "../pages/incident/log/CaseList";
import Welcome from "../pages/incident/log/WelcomePage";
import OpenPendingCases from "../pages/incident/log/OpenPendingCases";
import LODPreview from "../pages/lod/ftl_lod/ftl_lod/PreviewOfFtlLod";
import DownloadLOD from "../pages/lod/ftl_lod/ftl_lod/DownloadCreateFtlLod";
import CR_Update_LOD from "../pages/lod/digital_signature_lod/lod/CR_Update_LOD";
import CR_Update from "../pages/lod/digital_signature_lod/lod/CR_Update";
import CR_Update_FR from "../pages/lod/digital_signature_lod/lod/CR_Update(FR)";
import Dispute_Log from "../pages/lod/digital_signature_lod/dispute/Dispute_Log";
import Dispute_Submission from "../pages/lod/digital_signature_lod/dispute/Dispute_Submission";
import F2 from "../pages/lod/digital_signature_lod/F2";
import FR_Creation from "../pages/lod/digital_signature_lod/final_reminder/FR_Creation";
import LOD_Creation from "../pages/lod/digital_signature_lod/lod/LOD_Creation";
import Post_Dispute_Log from "../pages/lod/digital_signature_lod/dispute/Post_Dispute_Log";
import Sup_FR_Log from "../pages/lod/digital_signature_lod/final_reminder/Sup_FR_Log";
import Sup_LOD_Log from "../pages/lod/digital_signature_lod/lod/Sup_LOD_Log";
import DirectLOD from "../pages/incident/log/DirectLOD";
import DRCcaseList from "../pages/drc/DRCcaseList";

// config
import Config from "../pages/config/Config";
import RegDrc from "../pages/drc/RegDrc";
import EditDRC from "../pages/drc/EditDRC";
import DrcList from "../pages/drc/DrcList";
import DrcInfo from "../pages/drc/DrcInfo";
import DRCsInfo from "../pages/drc/DRC'sInfo";
import RTomList from "../pages/rtom/RTomList";
import DrcEditHistory from "../pages/drc/EditHistory";
import DrcEditDetails from "../pages/drc/DrcEditDetails";
import DrcEnd from "../pages/drc/DrcEnd";
import ServiceTypesList from "../pages/serviceType/ServiceTypesList";
import RoListDrc from "../pages/ro/RoListDrc";
import RoList from "../pages/ro/RoList";
import AddRo from "../pages/ro/AddRo";
import RODetails from "../pages/ro/RODetails";
import ROEdit from "../pages/ro/ROEdit";
import RoEditDetails from "../pages/ro/RoEditDetails";
import RoEnd from "../pages/ro/RoEnd";
import RTomLog from "../pages/rtom/RTomLog";
import RTomEditHistory from "../pages/rtom/RTomEditHistory";
import RegRTom from "../pages/rtom/RegRTom";
import RTomInfo from "../pages/rtom/RTomInfo";
import RTomEditDetails from "../pages/rtom/RTomEditDetails";
import RTomEnd from "../pages/rtom/RtomEnd";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized/>} />

      
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['superadmin']} />} />

      {/* Prototype Routes */}
      <Route path="/prototypeA" element={<ProtectedRoute element={<PrototypeA />} allowedRoles={['superadmin']} />} />
      <Route path="/prototypeB" element={<ProtectedRoute element={<PrototypeB />} allowedRoles={['superadmin']} />} />


      {/* Incident Routes */}
      <Route path="/incident/register/individual" element={<ProtectedRoute element={<Individual />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/register/bulk" element={<ProtectedRoute element={<Bulk />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log" element={<ProtectedRoute element={<IncidentLog />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/rejectincidents" element={<ProtectedRoute element={<RejectIncidents />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/rejectlog" element={<ProtectedRoute element={<RejectLog />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/directlod" element={<ProtectedRoute element={<DirectLOD />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/welcome" element={<ProtectedRoute element={<Welcome />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/open-pending-cases" element={<ProtectedRoute element={<OpenPendingCases />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/case-details/:id" element={<ProtectedRoute element={<CaseDetails />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/case-list" element={<ProtectedRoute element={<CaseList />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/file-download" element={<ProtectedRoute element={<IncidentFileDownload />} allowedRoles={['superadmin']} />} />
      <Route path="/incident/log/upload-log" element={<ProtectedRoute element={<IncidentUploadLog />} allowedRoles={['superadmin']} />} />

      {/* DRC Routes */}
      <Route path="/drc/mediation-board" element={<ProtectedRoute element={<MediationBoard />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/period-extension" element={<ProtectedRoute element={<PeriodExtensionApproval />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/log" element={<ProtectedRoute element={<DRCLog />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/assigned-DRC-log" element={<ProtectedRoute element={<AssignedDRCLog />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/re-assign-DRC" element={<ProtectedRoute element={<ReAssignDRC />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/assign-DRC" element={<ProtectedRoute element={<AssignDRC />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/drcapproval" element={<ProtectedRoute element={<DRCApproval />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/pending" element={<ProtectedRoute element={<Pending />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/mediation-board-requests" element={<ProtectedRoute element={<MediationBoardSendingRequests />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/mediation-board-accept" element={<ProtectedRoute element={<MediationBoardAccept />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/mediation-board-response-log" element={<ProtectedRoute element={<MediationBoardResponseLog />} allowedRoles={['superadmin']} />} />
      <Route path="/drc/case-list" element={<ProtectedRoute element={<DRCcaseList />} allowedRoles={['superadmin']} />} />

      <Route path="/drc/logs" element={<ProtectedRoute element={<Logs />} allowedRoles={['superadmin']} />} />

      {/* LOD Routes */}
      <Route path="/lod/ftl-list" element={<ProtectedRoute element={<FtlLodList />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/ftl-log" element={<ProtectedRoute element={<FtlLodLog />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/litigation" element={<ProtectedRoute element={<Litigation />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/litigation-log" element={<ProtectedRoute element={<LitigationLog />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/post-litigation-log" element={<ProtectedRoute element={<PostLitigationLog />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/litigation-submission" element={<ProtectedRoute element={<LitigationSubmission />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/litigation-page" element={<ProtectedRoute element={<LitigationPage />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/digital-signature-log" element={<ProtectedRoute element={<LODLog />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/final-reminder-log" element={<ProtectedRoute element={<FinalReminderLog />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/submission-list" element={<ProtectedRoute element={<ListLOdSubmission />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/submitted-cases" element={<ProtectedRoute element={<ListLOdSubmitedCases />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/preview" element={<ProtectedRoute element={<LODPreview />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/download" element={<ProtectedRoute element={<DownloadLOD />} allowedRoles={['superadmin']} />} />

      {/* Settlement Routes */}
      <Route path="/settlement/adjustments" element={<ProtectedRoute element={<Adjustments />} allowedRoles={['superadmin']} />} />

      {/* Additional DRC Routes */}
      <Route path="/lod/cr-update-lod" element={<ProtectedRoute element={<CR_Update_LOD />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/cr-update" element={<ProtectedRoute element={<CR_Update />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/cr-update-fr" element={<ProtectedRoute element={<CR_Update_FR />} allowedRoles={['superadmin']} />} />
      <Route path="/dispute/Dispute_Log" element={<ProtectedRoute element={<Dispute_Log />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/digital_signature_lod/dispute/Dispute_Submission" element={<ProtectedRoute element={<Dispute_Submission />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/digital_signature_lod/F2" element={<ProtectedRoute element={<F2 />} allowedRoles={['superadmin']} />} />
      <Route path="/final_riminder/fr_creation" element={<ProtectedRoute element={<FR_Creation />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/lod-creation" element={<ProtectedRoute element={<LOD_Creation />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/digital_signature_lod/dispute/Post_Dispute_Log" element={<ProtectedRoute element={<Post_Dispute_Log />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/digital_signature_lod/final_riminder/sup_fr_log" element={<ProtectedRoute element={<Sup_FR_Log />} allowedRoles={['superadmin']} />} />
      <Route path="/lod/Sup_LOD_Log" element={<ProtectedRoute element={<Sup_LOD_Log />} allowedRoles={['superadmin']} />} />

      {/* config */} allowedRoles={['superadmin']} />}
      <Route path="/config" element={<ProtectedRoute element={<Config />} allowedRoles={['superadmin']} />} />
      <Route path="/config/regi-drc" element={<ProtectedRoute element={<RegDrc />} allowedRoles={['superadmin']} />} />
      <Route path="/config/edit-drc" element={<ProtectedRoute element={<EditDRC />} allowedRoles={['superadmin']} />} />
      <Route path="/config/drc-list" element={<ProtectedRoute element={<DrcList />} allowedRoles={['superadmin']} />} />
      <Route path="/config/drc-info/:drcId" element={<ProtectedRoute element={<DrcInfo />} allowedRoles={['superadmin']} />} />
      <Route path="/config/drc's-info/:drcId" element={<ProtectedRoute element={<DRCsInfo />} allowedRoles={['superadmin']} />} />
      <Route path="/config/rtom-list" element={<ProtectedRoute element={<RTomList />} allowedRoles={['superadmin']} />} />
      <Route path="/config/drc-edit-history" element={<ProtectedRoute element={<DrcEditHistory />} allowedRoles={['superadmin']} />} />
      <Route path="/config/drc-edit-details/:drcId" element={<ProtectedRoute element={<DrcEditDetails />} allowedRoles={['superadmin']} />} />
      <Route path="/config/service-types-list" element={<ProtectedRoute element={<ServiceTypesList />} allowedRoles={['superadmin']} />} />
      <Route path="/config/ro-list-drc" element={<ProtectedRoute element={<RoListDrc />} allowedRoles={['superadmin']} />} />
      <Route path="/config/drc-end/:drcId" element={<ProtectedRoute element={<DrcEnd />} allowedRoles={['superadmin']} />} />
      <Route path="/config/ro-list" element={<ProtectedRoute element={<RoList />} allowedRoles={['superadmin']} />} />
      <Route path="/config/add-ro" element={<ProtectedRoute element={<AddRo />} allowedRoles={['superadmin']} />} />
      <Route path="/config/ro-details/:roId" element={<ProtectedRoute element={<RODetails />} allowedRoles={['superadmin']} />} />
      <Route path="/config/ro-edit-details/:roId" element={<ProtectedRoute element={<RoEditDetails />} allowedRoles={['superadmin']} />} />
      <Route path="/config/ro-end/:roId" element={<ProtectedRoute element={<RoEnd />} allowedRoles={['superadmin']} />} />
      <Route path="/config/ro-edit/:roId" element={<ProtectedRoute element={<ROEdit />} allowedRoles={['superadmin']} />} />
      <Route path="/config/rtom-log" element={<ProtectedRoute element={<RTomLog />} allowedRoles={['superadmin']} />} />
      <Route path="/config/rtom-edit-history" element={<ProtectedRoute element={<RTomEditHistory />} allowedRoles={['superadmin']} />} />
      <Route path="/config/regi-rtom" element={<ProtectedRoute element={<RegRTom />} allowedRoles={['superadmin']} />} />
      <Route path="/config/rtom-info/:rtomId" element={<ProtectedRoute element={<RTomInfo />} allowedRoles={['superadmin']} />} />
      <Route path="/config/rtom-end/:rtomId" element={<ProtectedRoute element={<RTomEnd />} allowedRoles={['superadmin']} />} />
      <Route path="/config/rtom-edit-details/:rtomId" element={<ProtectedRoute element={<RTomEditDetails />} allowedRoles={['superadmin']} />} />
    </Routes>
  );
};

export default Routers;
