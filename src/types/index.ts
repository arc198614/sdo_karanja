export type Role = 'ADMIN' | 'SENIOR_OFFICER' | 'VRO' | 'INSPECTION_OFFICER';

export interface Question {
  id: string;
  department: string;
  questionText: string;
  isDocumentMandatory: boolean;
  marks: number;
}

export interface InspectionLog {
  inspectionId: string;
  date: string;
  sajaName: string;
  vroName: string;
  inspectionOfficer: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface ResponseCompliance {
  logId: string;
  questionId: string;
  officerFeedback: string;
  seniorOfficerOpinion: string;
  vroCompliance: string;
  driveLink?: string;
  finalRemark: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'ACTION_REQUIRED';
}
