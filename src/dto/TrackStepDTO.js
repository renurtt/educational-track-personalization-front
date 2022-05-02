import {LearningMaterialDTO} from "./LearningMaterialDTO";

export class TrackStepDTO {
    trackStepId;
    stepOrderNumber;
    completed;
    learningMaterial: LearningMaterialDTO = new LearningMaterialDTO();
}