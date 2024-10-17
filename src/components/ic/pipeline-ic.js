import InformationContainer from "./information-container"

/**
 * PipelineInformationContainer Component
 * 
 * A component that displays information about a model pipeline.
 * It uses the InformationContainer component to structure the content.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.checkpoint - The checkpoint information to be displayed
 * @param {string} props.model - The model information to be displayed
 * 
 * @returns {JSX.Element} A container with pipeline information
 * 
 * @example
 * <PipelineInformationContainer checkpoint="Checkpoint 1" model="GPT-3" />
 */

export default function PipelineInformationContainer({checkpoint, model}) {
    return (
      <InformationContainer title={"Model Pipeline"}>
        <PipelineInformationContainerContent checkpoint={checkpoint} model={model} />
      </InformationContainer>
    )
  }

function PipelineInformationContainerContent({checkpoint, model}) {
    return (
        <div>
          <p className="pipeline-content-title pipeline-content-margins">{checkpoint}</p>
          <p className="pipeline-content-subtitle pipeline-content-margins">Running on '{model}'</p>
        </div>
    )
}